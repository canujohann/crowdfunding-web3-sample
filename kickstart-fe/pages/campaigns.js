import React, { useState, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import { checkIfWalletIsConnected } from "../contracts/web3";
import Layout, { Web3Context } from "../components/Layout";
import { Link } from "../routes";
import getFactoryInfo from "../contracts/factoryUtil";

const CampaignIndex = (props) => {
  // States definition
  const [campaigns, setCampaigns] = useState([]);

  // Retrieve all the campaigns from the factory
  var retrieveCampaigns = async () => {
    const [factoryContract, web3Context] = getFactoryInfo();
    const info = await factoryContract?.methods.getDeployedCampaigns().call();
    setCampaigns(info);
  };

  useEffect(async () => {
    retrieveCampaigns();
  }, []);

  // get campaigns information and display them
  const renderCampaigns = () => {
    const items = campaigns?.map((address) => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link route="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        {renderCampaigns()}
      </div>
    </Layout>
  );
};

export default CampaignIndex;
