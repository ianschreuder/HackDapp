pragma solidity ^0.4.8;
contract Settlement{

	mapping (address => uint) public balances;

	address public vendor;
	address public buyer;
	address public affiliate;
	address public exchange = msg.sender;
	bool public vendorApprove;
	bool public buyerApprove;
	uint public remaining;
	uint public feeAmount;
	uint public affiliateCommission;

	event Deposit(address indexed from, uint amount);
	event Sent(address from, address to, uint amount);

	function Settlement(address vend, address cust, address affi) payable {
		buyer = cust;
		vendor = vend;
		affiliate = affi;
	}

	function approve(){
		if(msg.sender == buyer) buyerApprove = true;
		else if (msg.sender == vendor) vendorApprove = true;
		if (vendorApprove && buyerApprove) fee(); 
	}

	function abort(){
		if(msg.sender == buyer) buyerApprove = false;
		else if (msg.sender == vendor) vendorApprove = false;
		if(!vendorApprove && !buyerApprove) refund();
	}

	function payOut(){
		if (vendor.send(remaining)) balances[buyer] = 0;
	}

	function deposit() payable {
		if (msg.sender != buyer) throw;
		balances[buyer] += msg.value;
		Deposit(msg.sender, msg.value);
	}

	function killContract() internal {
		// kills contract and returns fund to buyer
		selfdestruct(exchange);
	}

	function refund(){
		// send money back to buyer if both parties agree contract is void
		if(buyerApprove == false && vendorApprove == false) selfdestruct(buyer);
	}

	function fee(){
		feeAmount = balances[buyer] / 100;
		remaining = balances[buyer] - feeAmount;
		if (!exchange.send(feeAmount)) // 1% fee
			throw; 
		affiliateCommission = remaining / 2;
		remaining = remaining - affiliateCommission;
		if (!affiliate.send(affiliateCommission)) // 1% fee
			throw; 
		payOut();
	}

}