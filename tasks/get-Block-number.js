const {task}= require("hardhat/config");
task("block-number","prints the current block number").setAction(
    async(taskArgs,hre)=>{
        const blockNum= await hre.ethers.provider.getBlockNumber();
        console.log(blockNum);
    }
)
module.exports={};