require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config()
module.exports = {
  
  networks: {
    polygon: {
      url: `https://polygon-mumbai.infura.io/v3/5d7df3adedc042aba1309696660d7796`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  paths:{
    artifacts: './src/artifacts',
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};