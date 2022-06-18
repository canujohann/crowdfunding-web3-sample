import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Grid, Button, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import getCampaignInfo from "../../contracts/campaignUtil";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";
import { showFriendlyAddress } from "../../common/utils";

const CampaignShow = ({ address }) => {
  // set state
  const [summary, setSummary] = React.useState({
    address: "",
    minimumContribution: 0,
    balance: "0",
    requestsCount: 0,
    approversCount: 0,
    manager: "",
    alreadyContributed: false,
    image: null,
  });
  const [web3, setWeb3] = React.useState(null);

  useEffect(async () => {
    const [campaign, web3Context] = getCampaignInfo(address);
    setWeb3(web3Context);
    const summary = await campaign.methods.getSummary().call();

    setSummary({
      address: address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
      alreadyContributed: summary[5],
      image: summary[6],
    });
  }, []);

  const renderCards = () => {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
      image,
    } = summary;

    const items = [
      {
        color: "blue",
        header: showFriendlyAddress(manager),
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        color: "blue",
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        color: "blue",
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A request tries to withdraw money from the contract. Requests must be approved by approvers",
      },
      {
        color: "blue",
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
      },
      {
        color: "blue",
        header: web3?.utils?.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend.",
      },
      {
        color: "blue",
        header: image,
        meta: "Campaign Image",
        description: "Test for url from IPFS",
      },
    ];

    return <Card.Group color="blue" items={items} />;
  };

  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Link route={`/campaigns/${address}/requests`}>
        <a>
          <Button primary>View Requests</Button>
        </a>
      </Link>
      <br />
      <br />
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            {!summary.alreadyContributed ? (
              <ContributeForm address={address} />
            ) : (
              <Message compact color="green">
                Already contributed, or you are the manager of the campaign.
              </Message>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
};

// Method specific to nextJS to retrieve props
CampaignShow.getInitialProps = async ({ query }) => {
  const address = query.address;
  return { address };
};

// props types definition
CampaignShow.propTypes = {
  address: PropTypes.string.isRequired,
};

export default CampaignShow;
