//  Application functions
window.App = {
  startApp: function() {
    web3Check();
    // Define Contract factory
    AppState.escrowContract = web3.eth.contract(Settlement.abi);
    this.loadAddresses();
  },

  loadAddresses: function() {
    for (i = 4; i < 6; i++) {
      address = web3.eth.accounts[i];
      $('#sideAffiliateList').append(`
        <li class="nav-item">
          <a class="nav-link" href="#" onClick="App.setAffiliateAddress('`+address+`')">` + address + `</a>
        </li>
      `);
    };

    AppState.affiliateA = web3.eth.accounts[4];
    AppState.affiliateAproductA = web3.eth.accounts[1];
    AppState.affiliateAproductB = web3.eth.accounts[2];
    AppState.affiliateAproductAPrice = 75;
    AppState.affiliateAproductBPrice = 50;

    AppState.affiliateB = web3.eth.accounts[5];
    AppState.affiliateBproductA = web3.eth.accounts[1];
    AppState.affiliateBproductB = web3.eth.accounts[2];
    AppState.affiliateBproductAPrice = 75;
    AppState.affiliateBproductBPrice = 50;

  },

  setAffiliateAddress: function(addy) {
    AppState.affilliateAddress = addy;
    web3.eth.getBalance(AppState.affilliateAddress, (e,r) => {
      balance = web3.fromWei(r.toNumber(), 'ether')
      AppState.sellerBalance = parseFloat(balance).toFixed(2);
    });

    $("#seller-address").text(AppState.affilliateAddress);
    $("#seller-balance").text(AppState.sellerBalance);
    $("#affiliateAddy").text(AppState.affilliateAddress);
    $("#onaffiliate").show();
    $("#ondashboard").hide();

    this.injectLinks(addy);
  },

  injectLinks: function(addy) {
    if (addy == AppState.affiliateA) {
      a = AppState.affiliateAproductA;
      b = AppState.affiliateAproductAPrice;
      c = AppState.affiliateAproductB;
      d = AppState.affiliateAproductBPrice;
      $("#affiliateLink-0").text("http://10.30.99.22:8545/src/purchase.html?vendor="+a+"&price="+b+"&affiliate="+addy);
      $("#affiliateLink-1").text("http://10.30.99.22:8545/src/purchase.html?vendor="+c+"&price="+d+"&affiliate="+addy);
    } else {
      a = AppState.affiliateBproductA;
      b = AppState.affiliateBproductAPrice;
      c = AppState.affiliateBproductB;
      d = AppState.affiliateBproductBPrice;
      $("#affiliateLink-0").text("http://10.30.99.22:8545/src/purchase.html?vendor="+a+"&price="+b+"&affiliate="+addy);
      $("#affiliateLink-1").text("http://10.30.99.22:8545/src/purchase.html?vendor="+c+"&price="+d+"&affiliate="+addy);
    }
  }

}


// Application Store
window.AppState = {
  escrowContract: {},
  escrowDeployed: {},
  vendorAddress: '',
  buyerAddress: '',
  affilliateAddress: '',
  amount: '',

  affiliateA: '',
  affiliateAproductA: '',
  affiliateAproductB: '',
  affiliateAproductAPrice: '',
  affiliateAproductBPrice: '',

  affiliateB: '',
  affiliateBproductA: '',
  affiliateBproductB: '',
  affiliateBproductAPrice: '',
  affiliateBproductBPrice: ''
}


// Utility Functions
displayError = e => {
  $("#error").text(e);
  setTimeout( () => $("#error").text(""), 5000 );
}

logError = e => { if (e != undefined || null) { console.log(e) } }

web3Check = () => { try {console.log(web3.eth.coinbase + " coinbase found")} catch (e) {displayError("RPC not found, Allow scripts using shield icon in address bar.")} }


// Contract Object
Settlement = {
  abi: [ { "constant": false, "inputs": [], "name": "approve", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "vendor", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balances", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "customer", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "vend", "type": "address" }, { "name": "cust", "type": "address" } ], "name": "setup", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "abort", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "remaining", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "refund", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "vendorApprove", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "feeAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "clickbankEscrow", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "customerApprove", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "payOut", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "type": "function" }, { "constant": false, "inputs": [], "name": "fee", "outputs": [], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Sent", "type": "event" } ], 
  bytecode: "0x606060405260038054600160a060020a03191633600160a060020a0316179055341561002757fe5b5b61060b806100376000396000f300606060405236156100bf5763ffffffff60e060020a60003504166312424e3f81146100c15780631385a6f2146100d357806327e235e3146100ff5780632804b2c01461012d5780632d34ba791461015957806335a063b41461017d57806355234ec01461018f578063590e1ae3146101b1578063614f1cb2146101c357806369e15404146101e75780638d93369c1461020957806399b1b35414610235578063c205240314610259578063d0e30db01461026b578063ddca3f4314610275575bfe5b34156100c957fe5b6100d1610287565b005b34156100db57fe5b6100e361031b565b60408051600160a060020a039092168252519081900360200190f35b341561010757fe5b61011b600160a060020a036004351661032a565b60408051918252519081900360200190f35b341561013557fe5b6100e361033c565b60408051600160a060020a039092168252519081900360200190f35b341561016157fe5b6100d1600160a060020a036004358116906024351661034b565b005b341561018557fe5b6100d1610398565b005b341561019757fe5b61011b610422565b60408051918252519081900360200190f35b34156101b957fe5b6100d1610428565b005b34156101cb57fe5b6101d3610462565b604080519115158252519081900360200190f35b34156101ef57fe5b61011b610472565b60408051918252519081900360200190f35b341561021157fe5b6100e3610478565b60408051600160a060020a039092168252519081900360200190f35b341561023d57fe5b6101d3610487565b604080519115158252519081900360200190f35b341561026157fe5b6100d1610497565b005b6100d16104e6565b005b341561027d57fe5b6100d1610562565b005b60025433600160a060020a03908116911614156102b9576003805460a860020a60ff02191660a860020a1790556102e7565b60015433600160a060020a03908116911614156102e7576003805460a060020a60ff02191660a060020a1790555b5b60035460a060020a900460ff16801561030a575060035460a860020a900460ff165b1561031757610317610562565b5b5b565b600154600160a060020a031681565b60006020819052908152604090205481565b600254600160a060020a031681565b60035433600160a060020a03908116911614156103935760028054600160a060020a03808416600160a060020a03199283161790925560018054928516929091169190911790555b5b5050565b60025433600160a060020a03908116911614156103c4576003805460a860020a60ff02191690556103ec565b60015433600160a060020a03908116911614156103ec576003805460a060020a60ff02191690555b5b60035460a060020a900460ff16158015610411575060035460a860020a900460ff16155b1561031757610317610428565b5b5b565b60045481565b60035460a860020a900460ff1615801561044c575060035460a060020a900460ff16155b1561031757600254600160a060020a0316ff5b5b565b60035460a060020a900460ff1681565b60055481565b600354600160a060020a031681565b60035460a860020a900460ff1681565b600154600454604051600160a060020a039092169181156108fc0291906000818181858888f193505050501561031757600254600160a060020a03166000908152602081905260408120555b5b565b60025433600160a060020a039081169116146105025760006000fd5b600254600160a060020a03908116600090815260208181526040918290208054349081019091558251908152915133909316927fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9281900390910190a25b565b600254600160a060020a03166000908152602081905260409020546064905b046005819055600254600160a060020a0390811660009081526020819052604080822054849003600455600354905192169280156108fc02929091818181858888f1935050505015156105d45760006000fd5b610317610497565b5b5600a165627a7a72305820fa1918b48efe63d76d5451bee7905b436b99b68b7154c1ec161a3bec4efd61e60029"
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
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://10.30.99.22:8545"));
  }
  setTimeout( () => App.startApp(), 300 );
});
