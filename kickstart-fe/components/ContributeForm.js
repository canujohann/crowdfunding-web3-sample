import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Input, Message, Button } from "semantic-ui-react";
import getCampaignInfo from "../contracts/campaignUtil";
import { Router } from "../routes";

const ContributeForm = ({ address }) => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // get campaign contract info
      const [campaign, web3] = getCampaignInfo(address);

      // Contribute to campaign
      // TODO user should be able to contribute only once to the same campain
      // TODO manager should not be able to contribute to a campaign
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      // TODO reload but value not updated :-(
      Router.replaceRoute(`/campaigns/${address}`);
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
    setValue("");
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button primary loading={loading}>
        Contribute!
      </Button>
    </Form>
  );
};

// Prop types definition
ContributeForm.propTypes = {
  address: PropTypes.string.isRequired,
};

export default ContributeForm;
