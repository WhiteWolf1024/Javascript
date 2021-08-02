// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";


contract Settlement is Ownable {

    address public proposer;
    address public agreedPerson;

    address public tokens;

    uint256 public settlementTime;


    enum status { Proposed, Disputed, Agreed }


    function agree() external onlyOwner {
        
    }

    function setStatus(status _status) external onlyOwner {
        
    }

    function distributeProposal() external onlyOwner {
        
    }

    function claimTokens(uint256 amount) external onlyOwner {
        
    }
}
