import React, { useState, useEffect, useCallback } from "react";
import { Card, Button } from "semantic-ui-react";
import Link from 'next/link';

import Layout from "../components/Layout";
import getFactoryInfo from "../contracts/factoryUtil";

const CampaignIndex = () => {
  // States definition
  const [campaigns, setCampaigns] = useState([]);

  // Retrieve all the campaigns from the factory
  const retrieveCampaigns = async () => {
    const [factoryContract] = getFactoryInfo();
    const info = await factoryContract?.methods.getDeployedCampaigns().call();
    setCampaigns(info);
  };

  useEffect(() => {
    retrieveCampaigns();
  }, []);

  // get campaigns information and display them
  const getCampaignsItem = useCallback(() => {
    return campaigns?.map((address) => {
      return {
        header: address,
        description: (
          <Link href={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });
  }, [campaigns]);

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new">
          <a>
            <Button
              floated="right"
              content="Create Campaign"
              icon="add circle"
              primary
            />
          </a>
        </Link>
        <Card.Group items={getCampaignsItem()} />
      </div>
    </Layout>
  );
};

export default CampaignIndex;
