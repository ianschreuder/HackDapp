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
<<<<<<< HEAD
      $("#affiliateLink-0").text("http://10.30.99.22:8545/src/purchase.html?vendor="+a+"&balance="+b+"&affiliate="+addy);
      $("#affiliateLink-1").text("http://10.30.99.22:8545/src/purchase.html?vendor="+c+"&balance="+d+"&affiliate="+addy);
=======
      $("#affiliateLink-0").text("http://10.30.99.22/src/purchase.html?vendor="+a+"&balance="+b+"&affiliate="+addy);
      $("#affiliateLink-1").text("http://10.30.99.22/src/purchase.html?vendor="+c+"&balance="+d+"&affiliate="+addy);
>>>>>>> c42676910b6ca805e816e0d8548d226d059c4159
    } else {
      a = AppState.affiliateBproductA;
      b = AppState.affiliateBproductAPrice;
      c = AppState.affiliateBproductB;
      d = AppState.affiliateBproductBPrice;
<<<<<<< HEAD
      $("#affiliateLink-0").text("http://10.30.99.22:8545/src/purchase.html?vendor="+a+"&balance="+b+"&affiliate="+addy);
      $("#affiliateLink-1").text("http://10.30.99.22:8545/src/purchase.html?vendor="+c+"&balance="+d+"&affiliate="+addy);
=======
      $("#affiliateLink-0").text("http://10.30.99.22/src/purchase.html?vendor="+a+"&balance="+b+"&affiliate="+addy);
      $("#affiliateLink-1").text("http://10.30.99.22/src/purchase.html?vendor="+c+"&balance="+d+"&affiliate="+addy);
>>>>>>> c42676910b6ca805e816e0d8548d226d059c4159
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
<<<<<<< HEAD
  abi: [ { "constant": false, "inputs": [ { "name": "affiliate", "type": "address" } ], "name": "payOut", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "affiliates", "outputs": [ { "name": "vendor", "type": "address" }, { "name": "buyer", "type": "address" }, { "name": "balance", "type": "uint256" }, { "name": "vendorApprove", "type": "bool" }, { "name": "buyerApprove", "type": "bool" }, { "name": "remaining", "type": "uint256" }, { "name": "feeAmount", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "affiliate", "type": "address" } ], "name": "fee", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "vend", "type": "address" }, { "name": "cust", "type": "address" }, { "name": "affiliate", "type": "address" } ], "name": "setup", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "affiliate", "type": "address" } ], "name": "abort", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "affiliate", "type": "address" } ], "name": "approve", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "exchangeEscrow", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "affiliate", "type": "address" } ], "name": "deposit", "outputs": [], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "affiliate", "type": "address" } ], "name": "refund", "outputs": [], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Sent", "type": "event" } ],
  bytecode: "0x606060405260008054600160a060020a03191633600160a060020a0316179055341561002757fe5b5b6106c1806100376000396000f3006060604052361561007d5763ffffffff60e060020a6000350416631922ff39811461007f5780634f51e2941461009d5780636fcca69b146100ff57806377b8b1c71461011d57806390cbfa1914610147578063daea85c514610165578063dc7025cf14610183578063f340fa01146101af578063fa89401a146101c5575bfe5b341561008757fe5b61009b600160a060020a03600435166101e3565b005b34156100a557fe5b6100b9600160a060020a0360043516610243565b60408051600160a060020a0398891681529690971660208701528587019490945291151560608501521515608084015260a083015260c082015290519081900360e00190f35b341561010757fe5b61009b600160a060020a0360043516610293565b005b341561012557fe5b61009b600160a060020a0360043581169060243581169060443516610320565b005b341561014f57fe5b61009b600160a060020a036004351661037e565b005b341561016d57fe5b61009b600160a060020a036004351661047a565b005b341561018b57fe5b61019361057e565b60408051600160a060020a039092168252519081900360200190f35b61009b600160a060020a036004351661058d565b005b34156101cd57fe5b61009b600160a060020a036004351661061e565b005b600160a060020a038082166000908152600160205260408082208054600490910154915193169281156108fc0292818181858888f193505050501561023f57600160a060020a0381166000908152600160205260408120600201555b5b50565b6001602081905260009182526040909120805491810154600282015460038301546004840154600590940154600160a060020a039586169590931693919260ff8083169361010090930416919087565b600160a060020a0381166000908152600160205260409020600201546064905b600160a060020a038084166000908152600160205260408082209490930460058501819055600285015481900360049095019490945580549251929091169280156108fc02929091818181858888f1935050505015156103135760006000fd5b61023f816101e3565b5b50565b60005433600160a060020a039081169116141561037857600160a060020a0381811660009081526001602081905260409091209081018054600160a060020a0319908116868516179091558154169185169190911790555b5b505050565b600160a060020a0380821660009081526001602081905260409091200154338216911614156103d057600160a060020a0381166000908152600160205260409020600301805461ff0019169055610419565b600160a060020a038082166000908152600160205260409020543382169116141561041957600160a060020a0381166000908152600160205260409020600301805460ff191690555b5b600160a060020a03811660009081526001602052604090206003015460ff161580156104675750600160a060020a038116600090815260016020526040902060030154610100900460ff16155b1561023f5761023f8161061e565b5b5b50565b600160a060020a0380821660009081526001602081905260409091200154338216911614156104d057600160a060020a0381166000908152600160205260409020600301805461ff00191661010017905561051f565b600160a060020a038082166000908152600160205260409020543382169116141561051f57600160a060020a0381166000908152600160208190526040909120600301805460ff191690911790555b5b600160a060020a03811660009081526001602052604090206003015460ff16801561056b5750600160a060020a038116600090815260016020526040902060030154610100900460ff165b1561023f5761023f81610293565b5b5b50565b600054600160a060020a031681565b600160a060020a03808216600090815260016020819052604090912001543382169116146105bb5760006000fd5b600160a060020a038082166000908152600160209081526040918290206002018054349081019091558251908152915133909316927fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9281900390910190a25b50565b600160a060020a038116600090815260016020526040902060030154610100900460ff1615801561066b5750600160a060020a03811660009081526001602052604090206003015460ff16155b1561023f57600160a060020a038082166000908152600160208190526040909120015416ff5b5b505600a165627a7a72305820e31cd6b25aab35e925371db53ba6197b1735ca53fa5bb6a55f7c4d7b0487ac420029"
=======
  abi: [ { "constant": false, "inputs": [ { "name": "affiliate", "type": "address" } ], "name": "getVendor", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "affiliate", "type": "address" } ], "name": "payOut", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "affiliates", "outputs": [ { "name": "vendor", "type": "address" }, { "name": "buyer", "type": "address" }, { "name": "balance", "type": "uint256" }, { "name": "vendorApprove", "type": "bool" }, { "name": "buyerApprove", "type": "bool" }, { "name": "remaining", "type": "uint256" }, { "name": "feeAmount", "type": "uint256" }, { "name": "affiliateCommission", "type": "uint256" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "affiliate", "type": "address" } ], "name": "getBuyer", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "affiliate", "type": "address" } ], "name": "fee", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "vend", "type": "address" }, { "name": "cust", "type": "address" }, { "name": "affiliate", "type": "address" } ], "name": "setup", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "affiliate", "type": "address" } ], "name": "abort", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "affiliate", "type": "address" } ], "name": "approve", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "exchangeEscrow", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "affiliate", "type": "address" } ], "name": "deposit", "outputs": [], "payable": true, "type": "function" }, { "constant": false, "inputs": [ { "name": "affiliate", "type": "address" } ], "name": "refund", "outputs": [], "payable": false, "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" } ], "name": "Sent", "type": "event" } ],
  bytecode: "0x606060405260008054600160a060020a03191633600160a060020a0316179055341561002757fe5b5b610808806100376000396000f300606060405236156100935763ffffffff60e060020a6000350416630bc0f7d381146100955780631922ff39146100cd5780634f51e294146100eb5780635721e419146101545780636fcca69b1461018c57806377b8b1c7146101aa57806390cbfa19146101d4578063daea85c5146101f2578063dc7025cf14610210578063f340fa011461023c578063fa89401a14610252575bfe5b341561009d57fe5b6100b1600160a060020a0360043516610270565b60408051600160a060020a039092168252519081900360200190f35b34156100d557fe5b6100e9600160a060020a0360043516610291565b005b34156100f357fe5b610107600160a060020a03600435166102f1565b60408051600160a060020a03998a168152979098166020880152868801959095529215156060860152901515608085015260a084015260c083015260e08201529051908190036101000190f35b341561015c57fe5b6100b1600160a060020a0360043516610346565b60408051600160a060020a039092168252519081900360200190f35b341561019457fe5b6100e9600160a060020a036004351661036b565b005b34156101b257fe5b6100e9600160a060020a0360043581169060243581169060443516610467565b005b34156101dc57fe5b6100e9600160a060020a03600435166104c5565b005b34156101fa57fe5b6100e9600160a060020a03600435166105c1565b005b341561021857fe5b6100b16106c5565b60408051600160a060020a039092168252519081900360200190f35b6100e9600160a060020a03600435166106d4565b005b341561025a57fe5b6100e9600160a060020a0360043516610765565b005b600160a060020a03808216600090815260016020526040902054165b919050565b600160a060020a038082166000908152600160205260408082208054600490910154915193169281156108fc0292818181858888f19350505050156102ed57600160a060020a0381166000908152600160205260408120600201555b5b50565b60016020819052600091825260409091208054918101546002820154600383015460048401546005850154600690950154600160a060020a039687169690941694929360ff8084169461010090940416929088565b600160a060020a0380821660009081526001602081905260409091200154165b919050565b600160a060020a0381166000908152600160205260409020600201546064905b600160a060020a0383166000908152600160205260409020919004600582018190556002918201805491909103908190555b600160a060020a038084166000908152600160205260408082209490930460068501819055600285015403600485015580546005909401549251939091169282156108fc029291818181858888f19350505050151561041c5760006000fd5b600160a060020a03811660008181526001602052604080822060060154905181156108fc0292818181858888f19350505050151561045a5760006000fd5b6102ed81610291565b5b50565b60005433600160a060020a03908116911614156104bf57600160a060020a0381811660009081526001602081905260409091209081018054600160a060020a0319908116868516179091558154169185169190911790555b5b505050565b600160a060020a03808216600090815260016020819052604090912001543382169116141561051757600160a060020a0381166000908152600160205260409020600301805461ff0019169055610560565b600160a060020a038082166000908152600160205260409020543382169116141561056057600160a060020a0381166000908152600160205260409020600301805460ff191690555b5b600160a060020a03811660009081526001602052604090206003015460ff161580156105ae5750600160a060020a038116600090815260016020526040902060030154610100900460ff16155b156102ed576102ed81610765565b5b5b50565b600160a060020a03808216600090815260016020819052604090912001543382169116141561061757600160a060020a0381166000908152600160205260409020600301805461ff001916610100179055610666565b600160a060020a038082166000908152600160205260409020543382169116141561066657600160a060020a0381166000908152600160208190526040909120600301805460ff191690911790555b5b600160a060020a03811660009081526001602052604090206003015460ff1680156106b25750600160a060020a038116600090815260016020526040902060030154610100900460ff165b156102ed576102ed8161036b565b5b5b50565b600054600160a060020a031681565b600160a060020a03808216600090815260016020819052604090912001543382169116146107025760006000fd5b600160a060020a038082166000908152600160209081526040918290206002018054349081019091558251908152915133909316927fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9281900390910190a25b50565b600160a060020a038116600090815260016020526040902060030154610100900460ff161580156107b25750600160a060020a03811660009081526001602052604090206003015460ff16155b156102ed57600160a060020a038082166000908152600160208190526040909120015416ff5b5b505600a165627a7a7230582053875cd0be98095e2e954ecc5fce7151cece3e122a12dfebc1a059ffa04074f00029"
>>>>>>> c42676910b6ca805e816e0d8548d226d059c4159
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
