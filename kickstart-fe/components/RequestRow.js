import React, { Component } from "react";
import Router from "next/router";
import { Table, Button } from "semantic-ui-react";

const RequestRow = (props) => {
  const onApprove = async () => {
    const accounts = await props.web3Context.eth.getAccounts();
    await props.campaign.methods.approveRequest(props.id).send({
      from: accounts[0],
    });
  };

  const reload = () => {
    Router.reload(window.location.pathname);
  };

  const onFinalize = async () => {
    const accounts = await props.web3Context.eth.getAccounts();
    await props.campaign.methods.finalizeRequest(props.id).send({
      from: accounts[0],
    });
  };

  const { Row, Cell } = Table;
  const { id, request, approversCount } = props;
  const readyToFinalize = request.approvalCount > approversCount / 2;

  return (
    <Row
      disabled={request.complete}
      positive={readyToFinalize && !request.complete}
    >
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{props.web3Context.utils.fromWei(request.value, "ether")}</Cell>
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
        </Button>
      </Cell>
    </Row>
  );
};

export default RequestRow;
