pragma solidity ^0.4.8;
pragma solidity ^0.4.8;
contract Settlement{

	// mapping (address => uint) public balances;
	address public exchangeEscrow = msg.sender;

	struct Affiliate {
		address vendor;
		address buyer;
		uint balance;
		bool vendorApprove;
		bool buyerApprove;
		uint remaining;
		uint feeAmount;
		uint affiliateCommission;
	}

	mapping(address => Affiliate) public affiliates;

	event Deposit(address indexed from, uint amount);
	event Sent(address from, address to, uint amount);

	function setup(address vend, address cust, address affiliate){
		if(msg.sender == exchangeEscrow){
			affiliates[affiliate].buyer = cust;
			affiliates[affiliate].vendor = vend;
		}
	}

	function approve(address affiliate){
		if(msg.sender == affiliates[affiliate].buyer) affiliates[affiliate].buyerApprove = true;
		else if (msg.sender == affiliates[affiliate].vendor) affiliates[affiliate].vendorApprove = true;
		if (affiliates[affiliate].vendorApprove && affiliates[affiliate].buyerApprove) fee(affiliate); 
	}

	function abort(address affiliate){
		if(msg.sender == affiliates[affiliate].buyer) affiliates[affiliate].buyerApprove = false;
		else if (msg.sender == affiliates[affiliate].vendor) affiliates[affiliate].vendorApprove = false;
		if(!affiliates[affiliate].vendorApprove && !affiliates[affiliate].buyerApprove) refund(affiliate);
	}

	function payOut(address affiliate){
		if (affiliates[affiliate].vendor.send(affiliates[affiliate].remaining)) affiliates[affiliate].balance = 0;
	}

	function deposit(address affiliate) payable {
		if (msg.sender != affiliates[affiliate].buyer) throw;
		affiliates[affiliate].balance += msg.value;
		Deposit(msg.sender, msg.value);
	}

	function killContract() internal {
		// kills contract and returns fund to buyer
		selfdestruct(exchangeEscrow);
	}

	function refund(address affiliate){
		// send money back to buyer if both parties agree contract is void
		if(affiliates[affiliate].buyerApprove == false && affiliates[affiliate].vendorApprove == false) 
			selfdestruct(affiliates[affiliate].buyer);
	}

	function fee(address affiliate){
		affiliates[affiliate].feeAmount = affiliates[affiliate].balance / 100;
		affiliates[affiliate].balance = affiliates[affiliate].balance - affiliates[affiliate].feeAmount;
		affiliates[affiliate].affiliateCommission = affiliates[affiliate].balance / 2;
		affiliates[affiliate].remaining = affiliates[affiliate].balance - affiliates[affiliate].affiliateCommission;
		if (!exchangeEscrow.send(affiliates[affiliate].feeAmount)) // 1% fee
			throw; 
		if (!affiliate.send(affiliates[affiliate].affiliateCommission)) // 1% fee
			throw; 	
		payOut(affiliate);
	}

}