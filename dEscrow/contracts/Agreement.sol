// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";


contract Agreement is Ownable {

    address public landlord;
    address public tenant;
    address public arbitrator;

    address public token;
    uint256 public tokenAmount;

    uint256 public startDate;
    uint256 public expirationDate;
    uint256 public costToDispute;
    arbitrationType public arbitration;

    enum arbitrationType { Baseball, Random, Arbitrator }

    enum depositStatus { Requested, Cancelled, Deposited, Disputed, Settled, Closed }

    constructor(
        address _tokenAddress,
        uint256 _tokenAmount,
        arbitrationType _arbitrationType
    ) {
        startDate = block.timestamp;
        landlord = msg.sender;
        token = _tokenAddress;
        tokenAmount = _tokenAmount;
        arbitration = _arbitrationType;
    }

    function setTenant(address _tenant) external onlyOwner {
        tenant = _tenant;
    }

    function setArbitrator(address _arbitrator) external onlyOwner {
        arbitrator = _arbitrator;
    }

    function requestDeposit(uint256 amount) external onlyOwner {
        
    }

    function cancelDeposit(uint256 amount) external onlyOwner {
        
    }

    function acceptDeposit(uint256 amount) external onlyOwner {
        
    }
}
