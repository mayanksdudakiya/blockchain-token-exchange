const Token = artifacts.require("Token");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Token", function (/* accounts */) {
  it("should assert true", async function () {
    await Token.deployed();
    return assert.isTrue(true);
  });
});
