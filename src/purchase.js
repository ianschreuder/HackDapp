//  Application functions
window.App = {
  startApp: function() {
    web3Check();
    // Define Contract factory
    AppState.escrowContract = web3.eth.contract(Settlement.abi);
    this.parseAddresses();
    this.showBuyers();
  },

  showBuyers: function() {
    for (i = 7; i < 9; i++) {
      address = web3.eth.accounts[i];
      $('#buyer-addresses').append(`
        <li class="nav-item">
          ` + address + `
        </li>
      `);
    };
  },

  parseAddresses: function(addy) {
    var $uri = new URI(); 
    var params = $uri.search(true)

    $("#vendor").val(params['vendor']);
    $("#affiliate").val(params['affiliate']);
    $("#balance").val(params['balance']);
    $("#item-balance").text(params['balance']);

    AppState.vendorAddress = params['vendor'];
    AppState.buyerAddress = params['buyer'];
    AppState.affilliateAddress = params['affiliate'];
    AppState.balance = params['balance'];

    $("#vendor").val(params['vendor']);
    $("#affiliate").val(params['affiliate']);
    $("#item-price").text(params['balance']);

  },

  submitContract: function() {

    AppState.escrowContract.new(
      AppState.vendorAddress, 
      AppState.buyerAddress, 
      AppState.affilliateAddress,
       {
         from: AppState.balance,
         data: Settlement.bytecode,
         gas: '2700000',
         value: web3.toWei(AppState.balance, "ether")
       },
      (e, contract) => {
        console.log("error: "+ e);
        console.log(contract)
        logError(e);
        if (typeof contract.address !== 'undefined') {
           console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
           AppState.escrowContract = contract;
        }
     });
  }

}

// Application Store
window.AppState = {
  escrowContract: {},
  escrowDeployed: {},
  vendorAddress: '',
  buyerAddress: '',
  affilliateAddress: '',
  balance: ''
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
  abi: [ { "constant": true, "inputs": [], "name": "buyerApprove", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "approve", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "vendor", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balances", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "abort", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "affiliate", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "remaining", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "refund", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "vendorApprove", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "feeAmount", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "buyer", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "payOut", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "affiliateCommission", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "type": "function" }, { "constant": true, "inputs": [], "name": "exchange", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "fee", "outputs": [], "payable": false, "type": "function" }, { "inputs": [ { "name": "vend", "type": "address" }, { "name": "cust", "type": "address" }, { "name": "affi", "type": "address" } ], "payable": true, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Sent", "type": "event" } ],
  bytecode: "0x6060604081905260048054600160a060020a03191633600160a060020a031617905580806106de8139810160409081528151602083015191909201515b60028054600160a060020a03808516600160a060020a0319928316179092556001805486841690831617905560038054928416929091169190911790555b5050505b6106518061008d6000396000f300606060405236156100ca5763ffffffff60e060020a60003504166309138a4a81146100cc57806312424e3f146100f05780631385a6f21461010257806327e235e31461012e57806335a063b41461015c57806345e05f431461016e57806355234ec01461019a578063590e1ae3146101bc578063614f1cb2146101ce57806369e15404146101f25780637150d8ae14610214578063c205240314610240578063c974c7ad14610252578063d0e30db014610274578063d2f7265a1461027e578063ddca3f43146102aa575bfe5b34156100d457fe5b6100dc6102bc565b604080519115158252519081900360200190f35b34156100f857fe5b6101006102cc565b005b341561010a57fe5b610112610360565b60408051600160a060020a039092168252519081900360200190f35b341561013657fe5b61014a600160a060020a036004351661036f565b60408051918252519081900360200190f35b341561016457fe5b610100610381565b005b341561017657fe5b61011261040b565b60408051600160a060020a039092168252519081900360200190f35b34156101a257fe5b61014a61041a565b60408051918252519081900360200190f35b34156101c457fe5b610100610420565b005b34156101d657fe5b6100dc61045a565b604080519115158252519081900360200190f35b34156101fa57fe5b61014a61046a565b60408051918252519081900360200190f35b341561021c57fe5b610112610470565b60408051600160a060020a039092168252519081900360200190f35b341561024857fe5b61010061047f565b005b341561025a57fe5b61014a6104ce565b60408051918252519081900360200190f35b6101006104d4565b005b341561028657fe5b610112610550565b60408051600160a060020a039092168252519081900360200190f35b34156102b257fe5b61010061055f565b005b60045460a860020a900460ff1681565b60025433600160a060020a03908116911614156102fe576004805460a860020a60ff02191660a860020a17905561032c565b60015433600160a060020a039081169116141561032c576004805460a060020a60ff02191660a060020a1790555b5b60045460a060020a900460ff16801561034f575060045460a860020a900460ff165b1561035c5761035c61055f565b5b5b565b600154600160a060020a031681565b60006020819052908152604090205481565b60025433600160a060020a03908116911614156103ad576004805460a860020a60ff02191690556103d5565b60015433600160a060020a03908116911614156103d5576004805460a060020a60ff02191690555b5b60045460a060020a900460ff161580156103fa575060045460a860020a900460ff16155b1561035c5761035c610420565b5b5b565b600354600160a060020a031681565b60055481565b60045460a860020a900460ff16158015610444575060045460a060020a900460ff16155b1561035c57600254600160a060020a0316ff5b5b565b60045460a060020a900460ff1681565b60065481565b600254600160a060020a031681565b600154600554604051600160a060020a039092169181156108fc0291906000818181858888f193505050501561035c57600254600160a060020a03166000908152602081905260408120555b5b565b60075481565b60025433600160a060020a039081169116146104f05760006000fd5b600254600160a060020a03908116600090815260208181526040918290208054349081019091558251908152915133909316927fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9281900390910190a25b565b600454600160a060020a031681565b600254600160a060020a03166000908152602081905260409020546064905b046006819055600254600160a060020a0390811660009081526020819052604080822054849003600555600454905192169280156108fc02929091818181858888f1935050505015156105d15760006000fd5b6005546002905b046007819055600580548290039055600354604051600160a060020a039091169180156108fc02916000818181858888f19350505050151561061a5760006000fd5b61035c61047f565b5b5600a165627a7a7230582056c9f102f307dd5c98da24a2ccb8408aad1bfd51d9b367c3249fef87ce324b4b0029"
}

// Application Initializer
window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
    console.log("Connected to web3...")
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://10.30.99.22:8545"));
  }
  setTimeout( () => App.startApp(), 300 );
});
