const hre = require("hardhat");

async function main() {
    let SchemaRegistry = "0x4200000000000000000000000000000000000020"; // Optimism Goerli UID#153
    // const eas = "0x23951c363ef8df12e471759896ae5786a65272cc318217e21b0ad8257e845ab9"; // https://optimism-goerli-bedrock.easscan.org/attestation/attestWithSchema/0x23951c363ef8df12e471759896ae5786a65272cc318217e21b0ad8257e845ab9
    const TokenTreatsRegistry = await hre.ethers.getContractFactory("TokenTreatsRegistry");
    const tokentreats = await TokenTreatsRegistry.deploy(SchemaRegistry);
    await tokentreats.deployed();
    console.log("TokenTreats deployed to", tokentreats.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });