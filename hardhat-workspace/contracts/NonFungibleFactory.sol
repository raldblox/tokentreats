// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/// @title Non-Fungible Treats ERC-721 Template
/// @author raldblox.eth
/// @dev Personalize by adding more functions
contract NonFungibleFactory is ERC721 {
    uint256 private _tokenIds;
    address private _creator;

    constructor() ERC721("NonFungibleTreats", "NFT") {
        _creator = msg.sender;
    }

    function mint(address receiver) public returns (uint256) {
        // NFT Logics
        _safeMint(receiver, _tokenIds);
        _tokenIds++;
        return _tokenIds;
    }

    function creator() public view returns (address) {
        return _creator;
    }

    // PERSONALIZE THIS NFT COLLECTION BY ADDING MORE FUNCTIONS
}
