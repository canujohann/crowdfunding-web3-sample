import React, { useState, useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout";
import getCampaignInfo from "../../../contracts/campaignUtil";
import RequestRow from "../../../components/RequestRow";

export type RequestIndexPropsType = {
  address: string;
}

const RequestIndex = (props: RequestIndexPropsType) => {
  const { address } = props;
  //states
  const [requests, setRequests] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [approversCount, setApproversCount] = useState(0);
  const [web3Context, setWeb3Context] = useState(null);
  const [camp, setCamp] = useState(null);

  // TODO: when 0 requests returns, useAffect is called indefinitely
  useEffect(async () => {
    if (requests.length == 0) {
      const [campaign, web3Context] = getCampaignInfo(address);
      setWeb3Context(web3Context);
      setCamp(campaign);

      const requestCountResult = await campaign.methods
        .getRequestsCount()
        .call();
      setRequestCount(parseInt(requestCountResult));

      const approversCountResult = await campaign.methods
        .approversCount()
        .call();
      setApproversCount(parseInt(approversCountResult));

      const requestsList = await Promise.all(
        Array(parseInt(requestCount))
          .fill()
          .map((element, index) => {
            return campaign.methods.requests(index).call();
          })
      );
      setRequests(requestsList);
    }
  }, [requests]);

  // Render list of requests
  const renderRows = () => {
    console.log(
      `renderRows was called !!!!!! and requests are ${JSON.stringify(
        requests
      )}`
    );
    return requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={address}
          approversCount={approversCount}
          web3Context={web3Context}
          campaign={camp}
        />
      );
    });
  };

  const { Header, Row, HeaderCell, Body } = Table;

  return (
    <Layout>
      <h3>Requests</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{ marginBottom: 10 }}>
            Add Request
          </Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
      <div>Found {requestCount} requests.</div>
    </Layout>
  );
};

RequestIndex.getInitialProps = async ({ query }) => {
  const address = query.address;
  return { address };
};

export default RequestIndex;
