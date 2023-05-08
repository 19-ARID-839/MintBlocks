// SPDX-License-Identifier: MIT

//This code is defining a Solidity contract for a non-fungible token (NFT) marketplace. The contract is written in Solidity, a programming language for the Ethereum blockchain.
pragma solidity ^0.8.4;

//The contract extends the ERC721 contract, which is a standard interface for non-fungible tokens. The ERC721 contract is imported from the OpenZeppelin library.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

//The contract also imports the ERC721URIStorage contract, which allows each token to have a unique URI (Uniform Resource Identifier) that can be used to store and retrieve information about the token.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

//The contract also imports the Counters library, which provides utility functions for working with counters (variables that track the number of times something happens).
import "@openzeppelin/contracts/utils/Counters.sol";

//The import "hardhat/console.sol"; statement is used to import the console library from the Hardhat framework. The console library provides utility functions for logging messages to the console, which can be helpful for debugging and testing purposes.
import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;

    //This is a counter for tracking the number of tokens that have been created.
    Counters.Counter private _tokenIds;

    //This is a counter for tracking the number of items that have been sold on the marketplace.
    Counters.Counter private _itemsSold;

    //This is the price that must be paid to list an item on the marketplace.
    uint256 listingPrice = 0.025 ether;

    //The owner variable in this contract refers to the owner of the marketplace contract, not the owner of individual NFTs.
    address payable owner;

    //declares a mapping called idToMarketItem that associates uint256 keys with MarketItem values. In this case, the MarketItem struct represents an item that is being sold on the marketplace, and the uint256 key represents the ID of the NFT that is being sold. so NFT Id is mmapped to the MarketItem
    mapping(uint256 => MarketItem) private idToMarketItem;

    // This struct represents an item that is being sold on the marketplace. It has fields for the token ID, seller, owner, price, and whether or not it has been sold.
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    //This event is emitted when a new MarketItem struct is created and added to the marketplace.
    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    //constructor run when contract is deployed on blockchain. This code defines the constructor function for the contract, and it calls the constructor function for the ERC721 contract (which is inherited by this contract) to initialize the ERC721 contract with the given name and symbol.

    //The constructor function also sets the value of the owner variable to the contract owner. The owner variable is a state variable that represents the owner of the marketplace contract. The msg.sender variable refers to the address of the account that deployed the contract, so this code sets the owner variable to the address of the contract owner.

    //When the contract is deployed to the Ethereum blockchain, the constructor function will be run automatically to initialize the contract and set the owner variable.
    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
    }

    /* Updates the listing price of the contract */
    function updateListingPrice(uint256 _listingPrice) public payable {
        require(
            owner == msg.sender,
            "Only marketplace owner can update listing price."
        );
        listingPrice = _listingPrice;
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    /* Mints a token and lists it in the marketplace */
    //tokenURI: This is a string parameter that represents the URI (Uniform Resource Identifier) for the NFT being created. The URI can be used to store and retrieve information about the NFT.
    function createToken(string memory tokenURI, uint256 price)
        public
        payable
        returns (uint256)
    {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);
        return newTokenId;
    }

// This function creates a MarketItem struct for a given token ID and adds it to the marketplace. The function requires that the msg.value (the amount of ether sent with the message) is equal to the listingPrice, and it transfers ownership of the token to the contract.
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1 wei");
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender), // it set seller, it is payable bcz it was payable in MarketItem struct
            payable(address(this)), // contract is the owner, bcz no one purchased NFT
            price,
            false
        );

//The _transfer function is used to transfer ownership of the NFT from the seller to the marketplace contract. This function is inherited from the ERC721 contract and it updates the NFT's ownership information on the blockchain.
        _transfer(msg.sender, address(this), tokenId);
        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        );
    }

    /* allows someone to resell a token they have purchased */
    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idToMarketItem[tokenId].price;
        address seller = idToMarketItem[tokenId].seller;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        payable(seller).transfer(msg.value);
    }

    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /* Returns only items a user has listed */
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
