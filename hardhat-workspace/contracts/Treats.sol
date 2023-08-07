// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TokenTreatsRegistry {
    uint256 public treatIds;

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

    function giveTreats(
        address receiver,
        uint256 amount,
        bool isFungible
    ) public {
        treats.treatId.push(treatIds);
        treats.receiver[treatIds] = receiver;
        treats.sender[treatIds] = msg.sender;
        if (isFungible) {
            treats.isFungible[treatIds] = isFungible;
            treats.amount[treatIds] = amount;
        }
    }
}
