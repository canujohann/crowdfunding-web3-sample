// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "./Campaign.sol";

/**
Contract for creating a new campaign (Factory pattern)
 */
contract CampaignFactory {
    // Array of all the already deployed campaigns
    address[] public deployedCampaigns;

    // Create a new Campaign and push it to the blockchain
    function createCampaign(uint256 minimum) public {
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(address(newCampaign));
    }

    // Retrieve a specific deployed campaigns
    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}
