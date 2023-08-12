const { EAS, SchemaEncoder } = require("@ethereum-attestation-service/eas-sdk");
const { ethers } = require('ethers');

async function encodeAttestation() {

    const schemaEncoder = new SchemaEncoder("address WhoLovesTreats?,bool FungibleTreats?,string TokenName,address TokenAddress");

    const encodedData = schemaEncoder.encodeData([
        { name: "WWhoLovesTreats?", value: "raldblox.eth", type: "address" },
        { name: "FungibleTreats?", value: true, type: "bool" },
        { name: "TokenName", value: "Ethereum", type: "string" },
        { name: "TokenAddress", value: "", type: "address" },
    ]);

    const tx = await eas.attest({
        schema: config.schemaUID,
        data: {
            recipient: config.fromAddress,
            expirationTime: 0,
            revocable: true,
            data: encodedData,
            value: 0,
        },
    });

    console.log(encodedData)
}
encodeAttestation()