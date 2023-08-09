// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract TokenTreatsRegistry {
    uint256 public treatIds;
    using SafeERC20 for IERC20;

    constructor() {}

    struct Treats {
        uint256[] treatId;
        mapping(uint => address) receiver;
        mapping(uint => address) sender;
        mapping(uint => uint) amount;
        mapping(uint => bool) isFungible;
        mapping(uint => address) tokenAddress; // @note if fungible, need to specify the desired token as treats
    }

    Treats private treats;
    mapping(address => uint[]) myTreats;

    mapping(address => IERC20) public fungibleTreats;

    function giveTreats(
        address receiver,
        uint256 amount,
        bool isFungible
    ) public {
        require(receiver != address(0));
        treats.treatId.push(treatIds);
        treats.receiver[treatIds] = receiver;
        treats.sender[treatIds] = msg.sender;
        if (isFungible) {
            treats.isFungible[treatIds] = isFungible;
            treats.amount[treatIds] = amount;
        }
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
