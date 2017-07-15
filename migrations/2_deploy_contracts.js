var EscrowDapp = artifacts.require("./EscrowDapp.sol");

module.exports = function(deployer) {
  deployer.deploy(EscrowDapp);
};
