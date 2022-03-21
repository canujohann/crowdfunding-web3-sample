import React, { useState, useEffect } from "react";
import { Container, Message, Button } from "semantic-ui-react";
import styled from "styled-components";
import Web3 from "web3";
import Header from "./Header";

import "semantic-ui-css/semantic.min.css";

const ButtonStyled = styled(Button)`
  border: 0px none !important;
  border-radius: 16px !important;
  font-size: 16px !important;
  transition: background-color 0.2s ease 0s, opacity 0.2s ease 0s !important;
  height: 32px !important;
  padding: 0px 16px !important;
  background-color: rgb(31, 199, 212) !important;
  color: white !important;
  &:hover {
    opacity: 0.6 !important;
  }
`;

const NoMetamask = () => {
  return (
    <Message>
      <Message.Header>Metamask requiered</Message.Header>
      <p>Please install Metamask and connect it to your browser.</p>
    </Message>
  );
};

const NoConnection = (props) => {
  return (
    <Message>
      <p>
        Please connect to MetaMask&nbsp;
        <ButtonStyled onClick={props.connect}>Connect</ButtonStyled>
      </p>
    </Message>
  );
};

const Layout = (props) => {
  // States definition
  const [hasMetamask, setHasMetamask] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");

  // Connect dapp to metamask
  var connect = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Set the address (first address from metamask)
      setAddress(accounts[0]);
    }
  };

  useEffect(async () => {
    // Check if metamask is installed
    setHasMetamask(window.ethereum);

    // Check if metamask is connected
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length > 0) {
      setIsConnected(true);
      connect();
    } else {
      setIsConnected(false);
    }
  }, []);

  return (
    <div>
      <Container>
        <Header signer={address} test2="fd" />
        {!hasMetamask && <NoMetamask />}
        {hasMetamask && !isConnected && <NoConnection connect={connect} />}
        {hasMetamask && isConnected && props.children}
      </Container>
    </div>
  );
};

export default Layout;
