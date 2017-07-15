var EscrowDapp = artifacts.require("./EscrowDapp.sol");

contract('EscrowDapp', function(accounts) {

  it("creating a new escrow should initiatialize the buyer and seller", function() {

    var dapp;
    var seller = accounts[0];
    var buyer  = accounts[1];

    return EscrowDapp.deployed().then(function(instance) {
      dapp = instance;
      return dapp.startEscrowWith(buyer);

    }).then(function(id) {
      console.log("got id: " + JSON.stringify(id));

    }).then(function(escrow){
      assert.equal(escrow.seller, seller, "Should be seller");
      assert.equal(escrow.buyer, buyer, "Should be buyer");
  
    });

  });
  
//   it("should transfer deposited monies when both approve", function() {

//     var escrow;
//     var seller = accounts[0];
//     var buyer  = accounts[1];
//     var sellerInitial = web3.eth.getBalance(seller).toNumber();
//     var buyerInitial  = web3.eth.getBalance(buyer).toNumber();
//     var xferAmount = 1001;

//     return Escrow.deployed().then(function(instance) {
//       escrow = instance;
//       escrow.setup(seller, buyer);
//       escrow.deposit({from: buyer, value: xferAmount});
//       escrow.approve.call({from: seller});
//       escrow.approve.call({from: buyer});
//       escrow.payOut.call();

//     }).then(function(){
//       bal = web3.eth.getBalance(seller).toNumber();
// console.log("uhhh: "+bal)
//       assert.equal(bal, sellerInitial + xferAmount, "Seller should have +"+xferAmount);

//     }).then(function(){
//       bal = web3.eth.getBalance(buyer).toNumber();
//       assert.equal(bal, buyerInitial - xferAmount, "Buyer should have +"-xferAmount);

//     });

//   });
  
});
