import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { Table, Button } from "semantic-ui-react";

const RequestRow = ({ id, request, approversCount, web3Context, campaign }) => {
  const onApprove = async () => {
    const accounts = await web3Context.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });
  };

  const reload = () => {
    Router.reload(window.location.pathname);
  };

  const onFinalize = async () => {
    const accounts = await web3Context.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });
  };

  const { Row, Cell } = Table;
  const readyToFinalize = request.approvalCount > approversCount / 2;

  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3Context.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="green" basic onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button color="teal" basic onClick={onFinalize}>
            Finalize
          </Button>
        )}
        <Button color="teal" basic onClick={reload}>
          Reload
          {typeof approversCount} here
        </Button>
      </Cell>
    </Row>
  );
};

// Prop types definition
RequestRow.propTypes = {
  web3Context: PropTypes.any.isRequired,
  id: PropTypes.number.isRequired,
  campaign: PropTypes.any.isRequired,
  request: PropTypes.shape({
    description: PropTypes.string,
    value: PropTypes.string,
    recipient: PropTypes.string,
    coplete: PropTypes.bool,
    approvalCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  approversCount: PropTypes.number.isRequired,
};

export default RequestRow;
