import React from "react";
import Router from "next/router";
import { Table, Button } from "semantic-ui-react";

export type RequestRowPropsType = {
  id: number;
  campaign: any;
  approversCount: number;
  web3Context: any;
  request: {
    description: string;
    value: string;
    recipient: string;
    complete: boolean;
    approvalCount: string | number;
  }
};

const RequestRow = (props: RequestRowPropsType) => {
  const { id, request, approversCount, web3Context, campaign } = props;

  const { Row, Cell } = Table;
  const readyToFinalize = request.approvalCount > approversCount / 2;
  
  const onApprove = async () => {
    const accounts = await web3Context.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });
  };

  const reload = () => {
    Router.reload();
  };

  const onFinalize = async () => {
    const accounts = await web3Context.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });
  };


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

export default RequestRow;
