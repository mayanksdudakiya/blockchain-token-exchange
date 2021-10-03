// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Token {
  string public constant name = "Master Token";
  string public constant symbol = "MT";
  uint256 public constant decimals = 18;
  uint256 public totalSupply;
  uint256 public totalToken = 10000;
  constructor() public {
    totalSupply = totalToken * (10 ** decimals);
  }
}
