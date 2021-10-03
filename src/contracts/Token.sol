// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";

contract Token {
    using SafeMath for uint256;

    // Variables
    string public constant name = "Master Token";
    string public constant symbol = "MT";
    uint256 public constant decimals = 18;
    uint256 public totalSupply;
    uint256 private totalToken = 10000;
    mapping(address => uint256) public balanceOf;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    constructor() {
        totalSupply = totalToken * (10 ** decimals);
        
        // Assign total supply to the owner msg.sender = owner address
        balanceOf[msg.sender] = totalSupply;
    }

    // Transfer token from sender to receiver
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(_to != address(0));
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] = balanceOf[msg.sender].sub(_value);
        balanceOf[_to] = balanceOf[_to].add(_value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
