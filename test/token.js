const Token = artifacts.require("Token");

require('chai')
  .use(require('chai-as-promised'))
  .should();
  
contract("Token", function (accounts) {
  const name = "Master Token",
        symbol = "MT",
        decimals = "18",
        totalSupply = "10000000000000000000000";

  let token;

  
  beforeEach(async () => {
    token = await Token.new();
  });
  
  describe('deployment', () => {

    it("token name should be", async () => {
      const result = await token.name();
      result.should.equal(name);
    });
 
    it("token symbol should be", async () => {
      const result = await token.symbol();
      result.should.equal(symbol);
    });
 
    it("token decimals should be", async () => {
      const result = await token.decimals();
      result.toString().should.equal(decimals);
    });

    it("token total supply should be", async () => {
      const result = await token.totalSupply();
      result.toString().should.equal(totalSupply);
    });

    it("assigns the total supply to the deployer", async() => {
      const result = await token.balanceOf(accounts[0]);
      result.toString().should.equal(totalSupply);
    }); 

  });
  
});
