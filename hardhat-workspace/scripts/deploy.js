const hre = require("hardhat");

async function main() {
    const TokenTreatsRegistry = await hre.ethers.getContractFactory("TokenTreatsRegistry");
    const tokentreats = await TokenTreatsRegistry.deploy();
    await tokentreats.deployed();
    console.log("TokenTreats deployed to", tokentreats.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });