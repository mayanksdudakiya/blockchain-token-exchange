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

    // Test token name 
    it("token name should be", async () => {
      const result = await token.name();
      result.should.equal(name);
    });

    // Test token symbol 
    it("token symbol should be", async () => {
      const result = await token.symbol();
      result.should.equal(symbol);
    });

    // Test token decimals 
    it("token decimals should be", async () => {
      const result = await token.decimals();
      result.toString().should.equal(decimals);
    });

    // Test token total supply 
    it("token total supply should be", async () => {
      const result = await token.totalSupply();
      result.toString().should.equal(totalSupply);
    });

  });
  
});
