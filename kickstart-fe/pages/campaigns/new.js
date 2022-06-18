import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { create } from "ipfs-http-client";
import Layout from "../../components/Layout";
import getFactoryInfo from "../../contracts/factoryUtil";
import { Router } from "../../routes";

const client = create("https://ipfs.infura.io:5001/api/v0");

const CampaignNew = () => {
  // States definition
  const [minimumContribution, setMinimumContribution] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  // Create a new campaign
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const [factoryContract, web3Context] = getFactoryInfo();
      const accounts = await web3Context.eth.getAccounts();

      //update file on IPFS (if file existing)
      if (file) {
        const created = await client.add(file);
        const url = `https://ipfs.infura.io/ipfs/${created.path}`;
        console.log(`url to be used is ${url}`);
      }

      // Update blockchain
      await factoryContract.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });

      Router.pushRoute("/campaigns");
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      // console.log("Buffer data: ", Buffer(reader.result));
      setFile(Buffer(reader.result));
    };
    e.preventDefault();
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

        <input type="file" name="data" onChange={retrieveFile} />

        <Message error header="Oops!" content={errorMessage} />
        <Button loading={loading} primary>
          Create!
        </Button>
      </Form>
    </Layout>
  );
};

export default CampaignNew;
