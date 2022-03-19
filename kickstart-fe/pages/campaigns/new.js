import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import getFactoryInfo from "../../contracts/factoryUtil";
import { Router } from "../../routes";

const CampaignNew = () => {
  // States definition
  const [minimumContribution, setMinimumContribution] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Create a new campaign
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const [factoryContract, web3Context] = getFactoryInfo();
      const accounts = await web3Context.eth.getAccounts();
      await factoryContract.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });

      Router.pushRoute("/");
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <h3>Create Campaign</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            labelPosition="right"
            value={minimumContribution}
            onChange={(event) => setMinimumContribution(event.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
