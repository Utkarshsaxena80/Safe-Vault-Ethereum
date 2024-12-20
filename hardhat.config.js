const {config: dotEnvConfig}= require("dotenv");

dotEnvConfig();

require("@nomicfoundation/hardhat-toolbox");
require("./tasks/get-Block-number")
const SEPOLIA_RPC_url=process.env.SEPOLIA_RPC_URL;
const SEPOLIA_PRIVATE_key=process.env.SEPOLIA_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    sepolia:{
      url:SEPOLIA_RPC_url,
      accounts:[SEPOLIA_PRIVATE_key],
    },
    localhost:{
      url:"http://127.0.0.1:8545/",
      chainId:31337,
     },
  },
  solidity: "0.8.8",
};
