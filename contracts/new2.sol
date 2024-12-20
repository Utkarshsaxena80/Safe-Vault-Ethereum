// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SafeVault {
    address payable public owner;
    uint256 public ethAmount;

    // Constructor to set the contract owner
    constructor() {
        owner = payable(msg.sender);
    }

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    // Function to deposit Ether into the vault
    function deposit() public payable onlyOwner {
        require(msg.value > 0, "Deposit must be greater than 0");
        ethAmount += msg.value;
    }

    // Function to withdraw all Ether from the vault
    function withdraw() public onlyOwner {
        require(ethAmount > 0, "No funds to withdraw");
        uint256 amount = ethAmount;
        ethAmount = 0;

        (bool success, ) = owner.call{value: amount}("");
        require(success, "Withdrawal failed");
    }

    // View function to get the balance of the contract
    function getBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    // Fallback function to allow receiving Ether
    receive() external payable {
        deposit();
    }
}
