import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Message, Input } from "semantic-ui-react";
import getCampaignInfo from "../../../../contracts/campaignUtil";
import { Link, Router } from "../../../../routes";
import Layout from "../../../../components/Layout";

const RequestNew = ({ address }) => {
  // States definition
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const [campaign, web3Context] = getCampaignInfo(address);

    try {
      const accounts = await web3Context.eth.getAccounts();
      await campaign.methods
        .createRequest(
          description,
          web3Context.utils.toWei(value, "ether"),
          recipient
        )
        .send({ from: accounts[0] });
      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Link route={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          />
        </Form.Field>
        <Message error header="Oops!" content={errorMessage} />
        <Button primary loading={loading}>
          Create!
        </Button>
        <div>
          value is {value}
          description is {description}
          recipient is {recipient}
        </div>
      </Form>
    </Layout>
  );
};

RequestNew.getInitialProps = async ({ query }) => {
  const address = query.address;
  return { address };
};

// Props types definition
RequestNew.propTypes = {
  address: PropTypes.string.isRequired,
};

export default RequestNew;
