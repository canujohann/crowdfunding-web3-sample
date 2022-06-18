// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "./Campaign.sol";

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimum, string memory image) public {
        Campaign newCampaign = new Campaign(minimum, msg.sender, image);
        deployedCampaigns.push(address(newCampaign));
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}
