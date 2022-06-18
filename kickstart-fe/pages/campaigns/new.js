import React, { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { create } from "ipfs-http-client";
import Layout from "../../components/Layout";
import getFactoryInfo from "../../contracts/factoryUtil";
import { Router } from "../../routes";

const client = create(process.env.NEXT_PUBLIC_IPFS_CLIENT);

const CampaignNew = () => {
  // States definition
  const [minimumContribution, setMinimumContribution] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

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
        setImageUrl(
          `${process.env.NEXT_PUBLIC_IPFS_IMAGE_ROOT_URL}/${created.path}`
        );
      }

      // Update blockchain
      await factoryContract.methods
        .createCampaign(minimumContribution, imageUrl)
        .send({
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

        <Form.Field>
          <label>Image for the campaign</label>
          <Input type="file" name="data" onChange={retrieveFile} />
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
