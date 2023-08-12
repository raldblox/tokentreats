// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./FungibleTreatSwap.sol";
import "./NonFungibleFactory.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IEAS, AttestationRequest, AttestationRequestData} from "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import {NO_EXPIRATION_TIME, EMPTY_UID} from "@ethereum-attestation-service/eas-contracts/contracts/Common.sol";

contract TokenTreatsCore is Ownable {
    uint256 public treatIds;
    using SafeERC20 for IERC20;

    error InvalidEAS();

    IEAS private _eas;
    FungibleTreatSwap public fungibleTreatSwap; // FungibleSwap Contract
    // NonFungibleFactory public nonFungibleFactory; // FungibleSwap Contract
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
        mapping(uint256 => bool) isRedeemed;
        mapping(uint256 => address) receiver;
        mapping(uint256 => address) sender;
        mapping(uint256 => uint256) amountIn;
        mapping(uint256 => uint256) amountOut;
        mapping(uint256 => address) tokenIn;
        mapping(uint256 => address) tokenOut;
        mapping(uint256 => string) message;
        mapping(uint256 => string) file;
        mapping(uint256 => bool) isFungible;
        mapping(uint256 => address) tokenAddress; // @note if fungible, need to specify the desired token as treats
    }

    Treats private treats;
    mapping(address => uint256[]) public myTreats;
    mapping(uint256 => address) public treatReceivers;

    event TreatCreated(
        uint256 treatId,
        address sender,
        address receiver,
        uint256 amountIn,
        address tokenIn,
        bool isFungible
    );

    event TreatRedeemed(
        uint256 treatId,
        address redeemer,
        uint256 amountOut,
        address tokenOut
    );

    // Upgrade the UniswapV3 Router contract address
    function upgradeUniswapV3Router(address newRouter) external onlyOwner {
        uniswapV3Router = ISwapRouter(newRouter);
    }

    // Upgrade the FungibleTreatSwap contract address
    function upgradeFungibleTreatSwap(
        address newFungibleTreatSwap
    ) external onlyOwner {
        fungibleTreatSwap = FungibleTreatSwap(newFungibleTreatSwap);
    }

    // Upgrade the Ethereum Attestation Service contract address
    function upgradeEAS(address newEAS) external onlyOwner {
        _eas = IEAS(newEAS);
    }

    function createTreats(
        address receiver,
        address tokenIn,
        uint256 amountIn,
        string memory message,
        string memory file,
        bool isFungible
    ) public {
        require(receiver != address(0), "Receiver Can't Be Zero Address");
        require(amountIn > 0, "Insert Valid AmountIn");

        // Makes sure that msg.sender has enough tokenIn balance
        require(
            IERC20(tokenIn).balanceOf(msg.sender) >= amountIn,
            "Insufficient TokenIn Balance"
        );

        (bool success, bytes memory status) = address(tokenIn).call(
            abi.encodeWithSelector(
                IERC20(tokenIn).transferFrom.selector,
                msg.sender,
                address(this),
                amountIn
            )
        );

        require(
            success && (status.length == 0 || abi.decode(status, (bool))),
            "TokenIn Transfer Failed"
        );

        if (success) {
            treats.treatId.push(treatIds);
            treats.receiver[treatIds] = receiver;
            treats.sender[treatIds] = msg.sender;
            treats.message[treatIds] = message;
            treats.amountIn[treatIds] = amountIn;
            treats.tokenIn[treatIds] = tokenIn;
            treats.isFungible[treatIds] = isFungible;
            treats.file[treatIds] = file;
            treats.isRedeemed[treatIds] = false;
            treatReceivers[treatIds] = msg.sender;
            myTreats[receiver].push(treatIds);

            emit TreatCreated(
                treatIds,
                msg.sender,
                receiver,
                amountIn,
                tokenIn,
                isFungible
            );

            treatIds++;
        }
    }

    function redeemTreats(address tokenOut, uint256 treatId) external {
        require(tokenOut != address(0), "TokenOut not supported or invalid");
        require(!treats.isRedeemed[treatId], "Treats already Redeemed");
        require(
            treats.receiver[treatIds] == msg.sender,
            "Sender is not the Treat's Receiver"
        );

        bool fungible = treats.isFungible[treatIds];
        uint256 amountIn = treats.amountIn[treatId];
        address tokenIn = treats.tokenIn[treatId];

        if (fungible) {
            // SingleSwap Logics

            // Initiliaze Swap Tokens
            address[] memory path = new address[](2);
            path[0] = treats.tokenIn[treatIds]; // from this token
            path[1] = tokenOut; // to this Token

            // Swap Tokens using FungibleTreatSwap
            uint256 amountOut = fungibleTreatSwap.swapExactInputSingle(
                amountIn,
                tokenIn,
                tokenOut
            );

            // Set amountIn to zero
            treats.amountIn[treatId] = 0;

            // Record tokenOut Transaction
            treats.tokenOut[treatId] = tokenOut;
            treats.amountOut[treatId] = amountOut;

            emit TreatRedeemed(treatId, msg.sender, amountOut, tokenOut);
        } else {
            // NFT Logics

            // Initialiaze Supported NFT Collection
            NonFungibleFactory nonFungibleFactory = NonFungibleFactory(
                tokenOut
            );

            // Initialiaze NFT Creator
            address royaltyReceiver = nonFungibleFactory.creator();

            // Transfer tokenIn to the NFT Creator
            (bool success, bytes memory data) = address(tokenIn).call(
                abi.encodeWithSelector(
                    IERC20(tokenIn).transferFrom.selector,
                    address(this),
                    royaltyReceiver,
                    amountIn
                )
            );

            require(
                success && (data.length == 0 || abi.decode(data, (bool))),
                "TokenIn Transfer Failed"
            );

            if (success) {
                nonFungibleFactory.mint(msg.sender);
            }
        }

        // Update Redeem Status
        treats.isRedeemed[treatIds] = true;
    }

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

    function getTreatCount() external view returns (uint256) {
        return treatIds;
    }

    function getTreatDetails(
        uint256 treatId
    )
        external
        view
        returns (
            address receiver,
            address sender,
            uint256 amountIn,
            address tokenIn,
            bool isFungible,
            bool isRedeemed
        )
    {
        require(treatId < treatIds, "Treat not found");
        return (
            treats.receiver[treatId],
            treats.sender[treatId],
            treats.amountIn[treatId],
            treats.tokenIn[treatId],
            treats.isFungible[treatId],
            treats.isRedeemed[treatId]
        );
    }

    function getMyTreats(
        address user
    ) external view returns (uint256[] memory) {
        return myTreats[user];
    }
}
