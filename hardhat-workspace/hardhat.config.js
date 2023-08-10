require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-contract-sizer");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    opgoerli: {
      url: process.env.OPTIMISM_GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    opmainnet: {
      url: process.env.OPTIMISM_MAINNET_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    basemainnet: {
      url: 'https://mainnet.base.org',
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    },
    // for testnet
    basegoerli: {
      url: 'https://goerli.base.org',
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    apiKey: process.env.API_ETHERSCAN,
  },
};
