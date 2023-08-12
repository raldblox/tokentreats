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
    "op-goerli": {
      url: process.env.OPTIMISM_GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    "op-mainnet": {
      url: process.env.OPTIMISM_MAINNET_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    "base-mainnet": {
      url: 'https://mainnet.base.org',
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    },
    "base-goerli": {
      url: 'https://goerli.base.org',
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 1000000000,
    },
    "zora-goerli": {
      url: 'https://testnet.rpc.zora.energy/',
      accounts: [process.env.PRIVATE_KEY],
    },
    "zora-mainnet": {
      url: 'https://mainnet.rpc.zora.energy/',
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      "base-goerli": process.env.BASE_ETHERSCAN,
      "zora-goerli": process.env.ZORA_ETHERSCAN,
      "op-goerli": process.env.OP_ETHERSCAN,
    },
    customChains: [
      {
        network: "base-goerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org"
        }
      },
      {
        network: "zora-goerli",
        chainId: 999,
        urls: {
          apiURL: "https://testnet.rpc.zora.energy/",
          browserURL: "https://testnet.explorer.zora.energy/"
        }
      }
    ]
  },
};
