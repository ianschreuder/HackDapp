//  Application functions
window.App = {
  startApp: function() {
    web3Check();
    // Define Contract factory
    AppState.escrowContract = web3.eth.contract(EscrowDapp.abi);
    this.loadAddresses();
  },

  loadAddresses: function() {
    web3.eth.accounts.forEach(function(address) {
      str1 = `
        <li class="nav-item">
          <a class="nav-link" href="#" onClick="App.setSellerAddress('`+address+`')">` + address + `</a>
        </li>
      `
      str2 = `
        <li class="nav-item">
          <a class="nav-link" href="#" onClick="App.setBuyerAddress('`+address+`')">` + address + `</a>
        </li>
      `
      $('#sideSellerList').append(str1);
      $('#sideBuyerList').append(str2);
    });
  },

  setSellerAddress: function(addy) {
    AppState.sellerAddress = addy;
    web3.eth.getBalance(AppState.sellerAddress, (e,r) => {
      balance = web3.fromWei(r.toNumber(), 'ether')
      AppState.sellerBalance = parseFloat(balance).toFixed(2);
      $("#seller-address").text(AppState.sellerAddress);
      $("#seller-balance").text(AppState.sellerBalance);
    });
  },

  setBuyerAddress: function(addy) {
    AppState.buyerAddress = addy;
    web3.eth.getBalance(AppState.buyerAddress, (e,r) => {
      balance = web3.fromWei(r.toNumber(), 'ether')
      AppState.buyerBalance = parseFloat(balance).toFixed(2);
      $("#buyer-address").text(AppState.buyerAddress);
      $("#buyer-balance").text(AppState.buyerBalance);
    });
  },

  createContract: function(amt) {
    self = this;
    AppState.escrowContract.new(AppState.buyerAddress, 
       {
         from: AppState.sellerAddress,
         data: EscrowDapp.bytecode,
         gas: '2700000',
         value: web3.toWei(amt, "ether")
       },
      (e, contract) => {
        logError(e);
        if (typeof contract.address !== 'undefined') {
           console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
           AppState.escrowDeployed = contract;
        }
     });
  }

}


// Application Store
window.AppState = {
  escrowContract: {},
  escrowDeployed: {},
  sellerAddress: '',
  sellerBalance: '',
  buyerAddress: '',
  buyerBalance: ''
}


// Utility Functions
displayError = e => {
  $("#error").text(e);
  setTimeout( () => $("#error").text(""), 5000 );
}

logError = e => { if (e != undefined || null) { console.log(e) } }

web3Check = () => { try {console.log(web3.eth.coinbase + " coinbase found")} catch (e) {displayError("RPC not found, Allow scripts using shield icon in address bar.")} }


// Contract Object
EscrowDapp = {
  abi: [ { "constant": false, "inputs": [ { "name": "buyer", "type": "address" } ], "name": "startEscrowWith", "outputs": [ { "name": "id", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "refund", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "deposit", "outputs": [ { "name": "buyer", "type": "address" } ], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "approve", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "eId", "type": "uint256" } ], "name": "getSeller", "outputs": [ { "name": "seller", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "payOut", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "abort", "outputs": [], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_a", "type": "address" } ], "name": "Approve", "type": "event" } ], 
  bytecode: "0x6060604052341561000c57fe5b5b6104918061001c6000396000f300606060405236156100675763ffffffff60e060020a6000350416630805ed6c8114610069578063278ecde114610097578063b6b55f25146100ac578063b759f954146100d3578063d6a9de51146100e8578063da333ca614610117578063e50701f41461012c575bfe5b341561007157fe5b610085600160a060020a0360043516610141565b60408051918252519081900360200190f35b341561009f57fe5b6100aa60043561019b565b005b6100b7600435610217565b60408051600160a060020a039092168252519081900360200190f35b34156100db57fe5b6100aa600435610250565b005b34156100f057fe5b6100b7600435610335565b60408051600160a060020a039092168252519081900360200190f35b341561011f57fe5b6100aa600435610356565b005b341561013457fe5b6100aa6004356103a6565b005b600180548082018255600081815260208190526040902091820180548354600160a060020a03868116600160a060020a031992831617865560a060020a61ffff0219339190911691909216171690559081905b5050919050565b6000818152602081905260409020600181015460a060020a900460ff161580156101d15750600181015460a860020a900460ff16155b156102105780546002820154604051600160a060020a039092169181156108fc0291906000818181858888f1935050505015610210576102108261044a565b5b5b5b5050565b60008181526020819052604090208054600160a060020a03191633600160a060020a038116919091178255346002830155905b50919050565b604051600090600160a060020a033316907f96bfcd230b7ff6b6fae05762edc541f5cb32225984541cf1a9c0b04bac427a5e908390a2506000818152602081905260409020805433600160a060020a03908116911614156102c85760018101805460a060020a60ff02191660a060020a1790556102fa565b600181015433600160a060020a03908116911614156102fa5760018101805460a860020a60ff02191660a860020a1790555b5b600181015460a860020a900460ff1680156103215750600181015460a060020a900460ff165b156102105761021082610356565b5b5b5050565b600081815260208190526040902060010154600160a060020a03165b919050565b6000818152602081905260408082206001810154600282015492519193600160a060020a039091169280156108fc02929091818181858888f193505050501561021057600060028201555b5b5050565b6000818152602081905260409020805433600160a060020a03908116911614156103e15760018101805460a060020a60ff021916905561040d565b600181015433600160a060020a039081169116141561040d5760018101805460a860020a60ff02191690555b5b600181015460a860020a900460ff161580156104365750600181015460a060020a900460ff16155b15610210576102108261019b565b5b5b5050565b600081815260208190526040812060028101919091555b50505600a165627a7a72305820ac8949cb17b4285f5756b56c2723c2651f6440fb912ba7cea95cef615f8a0d8c0029"
}


// Application Initializer
window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
    console.log("Hodl connected to web3...")
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }
  setTimeout( () => App.startApp(), 300 );
});
