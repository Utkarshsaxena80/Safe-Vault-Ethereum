const {ethers}= require('hardhat');
function delay(ms){
    return new Promise(resolve=>setTimeout(resolve,ms))
}

async function deposited(){
    try{
        const deposit= await safeVault.deposit({value:ethers.parseEther("0.12")});
        await deposit.wait();
        console.log("ethereum successfully deposited ");
        console.log("ethereum will be auto reverted back in 10 seconds");
    }
    catch(error){
        console.log(error);
    }
}
async function returned( address1){
    try{
         await safeVault.returnDeposit();
        console.log(`Amount sucessfully returned at${address1} `); 
    }    
    catch(error){
        console.error(error);
    }    
}    
async function balance(){
    try{
        let getBalance=await safeVault.getBalance();
        console.log(getBalance);
    }
    catch(error){
        console.error(error);
    }
}

async function main (){
    
    const safeVaultFactory= await ethers.getContractFactory("safeVault");
    const safeVault= await safeVaultFactory.deploy();
    console.log("deploying contract ...");
    await safeVault.waitForDeployment();
    const  address= await safeVault.getAddress();
    const address1=await safeVault.giveAddress();
console.log(`deployed at ${address}`);
try{
    const deposit= await safeVault.deposit({value:ethers.parseEther("0.1")});
    await deposit.wait();
    console.log("ethereum successfully stored in the vault... ");
    console.log("ethereum will be auto reverted back in 10 seconds...");
}
catch(error){
    console.log(error);
}
try{
    let getBalance=await safeVault.getBalance();
    let balanceEth=ethers.formatEther(getBalance)
    console.log(`balance is ${balanceEth}`);
}
catch(error){
    console.error(error);
}

await delay(10000);
try{
    await safeVault.returnDeposit();
   console.log(`Amount sucessfully returned at : ${address1} `); 
}    
catch(error){
   console.error(error);
} 


try{
    let getBalance=await safeVault.getBalance();
    let balanceEth=ethers.formatEther(getBalance)
    console.log(`balance is ${balanceEth}`);
}
catch(error){
    console.error(error);
}




}
main ();