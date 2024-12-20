//SPDX-License-Identifer:MIT
pragma solidity ^0.8.8;

contract safeVault{
 address payable public myAddress;
uint256 public ethAmount;

constructor(){
    myAddress=payable(msg.sender);
}
 modifier onlyOwner(){
    require(msg.sender==myAddress,"Not authorized");
    _;
 }
function deposit() public payable onlyOwner{
    require(msg.value>0,"Deposited must be greater than 0");
    ethAmount+=msg.value;

}
function returnDeposit() public onlyOwner{
require(ethAmount>0,"No funds to withdraw");
uint256 amount= ethAmount;
ethAmount=0;
(bool success ,)= myAddress.call{value:amount}("");
require(success,"withdraw failed");
}
function getBalance() public view onlyOwner returns(uint256)
{
    return address(this).balance;
}
function giveAddress() public view  onlyOwner returns(address){
    return myAddress;
}
receive() external payable {
    deposit();
}
}