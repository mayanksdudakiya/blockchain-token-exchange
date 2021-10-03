// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Token {
  string public constant name = "Master Token";
  string public constant symbol = "MT";
  uint256 public constant decimals = 18;
  uint256 private totalSupply;
  constructor() public {
    totalSupply = 10000 * (10 ** decimals);
  }
}
