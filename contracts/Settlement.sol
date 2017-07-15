pragma solidity ^0.4.8;
pragma solidity ^0.4.8;
contract Settlement{

	mapping (address => uint) public balances;

	address public vendor;
	address public customer;
	address public clickbankEscrow = msg.sender;
	bool public vendorApprove;
	bool public customerApprove;
	uint public remaining;
	uint public feeAmount;

	event Deposit(address indexed from, uint amount);
	event Sent(address from, address to, uint amount);

	function setup(address vend, address cust){
		if(msg.sender == clickbankEscrow){
			customer = cust;
			vendor = vend;
		}
	}

	function approve(){
		if(msg.sender == customer) customerApprove = true;
		else if (msg.sender == vendor) vendorApprove = true;
		if (vendorApprove && customerApprove) fee(); 
	}

	function abort(){
		if(msg.sender == customer) customerApprove = false;
		else if (msg.sender == vendor) vendorApprove = false;
		if(!vendorApprove && !customerApprove) refund();
	}

	function payOut(){
		if (vendor.send(remaining)) balances[customer] = 0;
	}

	function deposit() payable {
		if (msg.sender != customer) throw;
		balances[customer] += msg.value;
		Deposit(msg.sender, msg.value);
	}

	function killContract() internal {
		// kills contract and returns fund to customer
		selfdestruct(clickbankEscrow);
	}

	function refund(){
		// send money back to customer if both parties agree contract is void
		if(customerApprove == false && vendorApprove == false) selfdestruct(customer);
	}

	function fee(){
		feeAmount = balances[customer] / 100;
		remaining = balances[customer] - feeAmount;
		if (!clickbankEscrow.send(feeAmount)) // 1% fee
			throw; 
		payOut();
	}

}