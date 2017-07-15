pragma solidity ^0.4.4;

contract EscrowDapp {
	struct escrow {
		address buyer;
		address seller;
    bool buyerApprove;
    bool sellerApprove;
		uint balance;
	}
	mapping(uint => escrow) escrows;
	uint numEscrows;

	function startEscrowWith(address buyer) returns (uint id) {
		uint escrowID = numEscrows++;
		escrow e = escrows[escrowID];
		e.seller = msg.sender;
		e.buyer = buyer;
    e.buyerApprove = false;
    e.sellerApprove = false;

    return escrowID;
	}

  function getSeller(uint eId) returns (address seller) {
    return escrows[eId].seller;
  }

	function deposit(uint id) payable returns (address buyer) {
		escrow e = escrows[id];
		e.buyer = msg.sender;
		e.balance = msg.value;

		return msg.sender;
	}

	event Approve(address indexed _a);
  function approve(uint id) {
    Approve(msg.sender);

		escrow e = escrows[id];
    
    if (msg.sender == e.buyer) {
			e.buyerApprove = true;

    } else if (msg.sender == e.seller) {
			e.sellerApprove = true;

    }

    if (e.sellerApprove && e.buyerApprove) {
			payOut(id);
    }
  }

  function abort(uint id) {
		escrow e = escrows[id];

		if (msg.sender == e.buyer) 
			e.buyerApprove = false;

		else if (msg.sender == e.seller) 
			e.sellerApprove = false;

		if (! e.sellerApprove && ! e.buyerApprove) 
			refund(id);
  }

  function payOut(uint id) {
    escrow e = escrows[id];

    if (e.seller.send(e.balance)) 
			e.balance = 0;
  }

	function refund(uint id) {
		escrow e = escrows[id];

    if (e.buyerApprove == false && e.sellerApprove == false) {
			if (e.buyer.send(e.balance))
			  clean(id);
		}
	}

	function clean(uint id) private {
		escrow e = escrows[id];
    e.balance = 0;
	}

}

	// event Transfer(address indexed _from, address indexed _to, uint256 _value);
  // Transfer(msg.sender, receiver, amount);
