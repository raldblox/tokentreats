# Token Treats Contracts

TokenTreatsCore is a Solidity smart contract that allows users to create and manage treat transfers on the Ethereum blockchain. It integrates with FungibleTreatSwap, based on [UniswapV3 SingleSwap](https://docs.uniswap.org/contracts/v3/guides/swaps/single-swaps), for swapping tokens and [Ethereum Attestation Service](https://docs.attest.sh/) for attesting treat-related data.

## Deployments

- **TokenTreatsCore**
- Optimism Goerli: [0x641adC152a7D6C8f5A3A59c26596aa71A3A4Ae40](https://goerli-optimism.etherscan.io/address/0x641adC152a7D6C8f5A3A59c26596aa71A3A4Ae40#code)
- Base Goerli: [0xbd2320795a69444796EA8D8628A492cc9b56a579](https://goerli.basescan.org/address/0xbd2320795a69444796EA8D8628A492cc9b56a579#code)
- Zora Goerli: UNISWAP NOT COMPATIBLE YET

## Table of Contents

- [Token Treats Contracts](#token-treats-contracts)
  - [Deployments](#deployments)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Creating Treats](#creating-treats)
    - [Redeeming Treats](#redeeming-treats)
    - [Attesting Treats](#attesting-treats)
    - [TokenTreatsCore](#tokentreatscore)
    - [FungibleTreatSwap](#fungibletreatswap)
  - [License](#license)
  - [Disclaimer](#disclaimer)

## Introduction

TokenTreatsCore is a smart contract designed to facilitate treat transfers on the Ethereum/EVM-compatible blockchain. It allows users to create treats, swap tokens using FungibleTreatSwap, and attest treat-related request using Ethereum Attestation Service.

## Getting Started

### Prerequisites

- Solidity compiler (version 0.8.9 or compatible)
- OpenZeppelin contracts (for SafeERC20, IERC20)
- Ethereum Attestation Service contracts (IEAS, AttestationRequest, Common)
- Uniswap v3 Router contract (ISwapRouter)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/raldblox/tokentreats.git
cd tokentreats
```

2. Install dependencies:

```bash
npm install
```

3. Some useful hardhat commands::

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
npx hardhat run scripts/deploy.js --network op-goerli
npx hardhat verify CONTRACT_ADDRESS --network op-goerli
npx hardhat verify --list-networks
```

## Usage

### Creating Treats

The `createTreats` function allows users to create treats and specify details such as the receiver, tokenIn, amountIn, message, file, and whether it's fungible.

### Redeeming Treats

The `redeemTreats` function is used to redeem treats. It swaps tokens using FungibleTreatSwap and updates treat details accordingly.

### Attesting Treats

The `attestTreats` function attests treat-related data using Ethereum Attestation Service.
Contract Details

### TokenTreatsCore

This contract manages the creation, redemption, and attestation of treats.

### FungibleTreatSwap

This contract provides functions for swapping tokens using Uniswap v3's router.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This documentation is for educational and informational purposes only. It does not constitute financial or legal advice. Use this information at your own risk
