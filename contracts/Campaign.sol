// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    uint256 public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    /**
    Can contribute only if amount is greater than minimum contribution
    and if sender has not contributed before
    and if sender is not the campaign manager.
     */
    function contribute() public payable {
        require(msg.value > minimumContribution);
        require(approvers[msg.sender] == false);
        require(msg.sender != manager);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string calldata description,
        uint256 value,
        address recipient
    ) public restricted {
        // `Request` Struct containing a (nested) mapping cannot be constructed
        // Need to use the workaround below
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint256 index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        // TypeError: "send" and "transfer" are only available for
        // objects of type "address payable", not "address".
        // Need to add the payable part
        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }

    /**
    Get basic information for a specific campaign:
    - Minimum contribution (0)
    - Balance of the contract (1)
    - number of requests (2)
    - number of contributors (3)
    - Manager address (4)
    - Is current user eligible for contribution (5)

     */
    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            bool
        )
    {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager,
            (approvers[msg.sender] || msg.sender == manager)
        );
    }

    function getRequestsCount() public view returns (uint256) {
        return requests.length;
    }
}
