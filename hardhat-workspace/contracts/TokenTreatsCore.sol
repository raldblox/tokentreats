// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./FungibleTreatSwap.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IEAS, AttestationRequest, AttestationRequestData} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import {NO_EXPIRATION_TIME, EMPTY_UID} from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";

contract TokenTreatsCore {
    uint256 public treatIds;
    using SafeERC20 for IERC20;

    error InvalidEAS();

    IEAS private immutable _eas;
    FungibleTreatSwap public fungibleTreatSwap; // FungibleSwap
    ISwapRouter public uniswapV3Router; // Uniswap Router

    constructor() {
        // Initialize FungibleTreatSwap and UniswapRouter
        ISwapRouter _uniswapV3Router = ISwapRouter(
            0xE592427A0AEce92De3Edee1F18E0157C05861564
        ); // SwapRouter for Mainnet, Goerli, Arbitrum, Optimism, Polygon

        fungibleTreatSwap = new FungibleTreatSwap(_uniswapV3Router);
        uniswapV3Router = _uniswapV3Router;

        // Initiliaze Ethereum Attestation Service
        IEAS eas = IEAS(0x4200000000000000000000000000000000000020); // @note OPTIMISM GOERLI
        // OPTIMISM GOERLI: 0x4200000000000000000000000000000000000020
        // OPTIMISM MAINNET: 0x4200000000000000000000000000000000000021
        // ETHEREUM MAINNET: 0xA7b39296258348C78294F95B872b282326A97BDF
        // SEPOLIA TESTNET: 0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0
        // BASE GOERLI: 0x720c2bA66D19A725143FBf5fDC5b4ADA2742682E

        _eas = eas;
    }

    struct Treats {
        uint256[] treatId;
        mapping(uint => address) receiver;
        mapping(uint => address) sender;
        mapping(uint => uint) amount;
        mapping(uint => string) message;
        mapping(uint => string) file;
        mapping(uint => bool) isFungible;
        mapping(uint => address) tokenAddress; // @note if fungible, need to specify the desired token as treats
    }

    Treats private treats;
    mapping(address => uint[]) public myTreats;
    mapping(address => IERC20) public fungibleTreats;

    function createTreats(
        address receiver,
        uint256 amount,
        string memory message,
        string memory file,
        bool isFungible
    ) public {
        require(
            receiver != address(0),
            "TokenTreats: Receiver Can't Be Zero Address"
        );
        require(amount > 0, "TokenTreats: Insert Valid Amount");
        treats.treatId.push(treatIds);
        treats.receiver[treatIds] = receiver;
        treats.message[treatIds] = message;
        treats.sender[treatIds] = msg.sender;
        if (isFungible) {
            treats.isFungible[treatIds] = isFungible;
            treats.amount[treatIds] = amount;
            treats.file[treatIds] = file;
        }
        treatIds++;
    }

    // Optimism Goerli UID#153

    function attestTreats(
        bytes32 schema,
        address whoLovesTreats,
        bool isFungibleTreats,
        string memory tokenName,
        address tokenAddress
    ) external returns (bytes32) {
        return
            _eas.attest(
                AttestationRequest({
                    schema: schema,
                    data: AttestationRequestData({
                        recipient: address(0),
                        expirationTime: NO_EXPIRATION_TIME,
                        revocable: true,
                        refUID: EMPTY_UID,
                        data: abi.encode(
                            whoLovesTreats,
                            isFungibleTreats,
                            tokenName,
                            tokenAddress
                        ),
                        value: 0
                    })
                })
            );
    }

    function processFungibleTreats(
        address receiver,
        address tokenAddress,
        uint amount
    ) public {
        // 1. Pro
    }

    function processNonFungibleTreats(
        address receiver,
        address tokenAddress,
        uint qty
    ) public {
        //
    }

    function redeemFungibleTokenTreats(address _rewardTokenAddress) external {
        require(
            fungibleTreats[_rewardTokenAddress] != IERC20(address(0)),
            "Fungible token not supported or invalid"
        );

        IERC20 fungibleTokenTreats = fungibleTreats[_rewardTokenAddress];
        uint256 fungibleTokenTreatsAmount = calculateFungibleTreatsAmount(); // reward calculation logic

        // transfer reward token to user
        fungibleTokenTreats.safeTransfer(msg.sender, fungibleTokenTreatsAmount);
    }

    function calculateFungibleTreatsAmount() internal pure returns (uint256) {
        // to implement token calculation logic
        return 100; // Example amount
    }
}