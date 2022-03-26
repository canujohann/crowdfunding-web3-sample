import React, { useState, useEffect } from "react";
import { Container, Message, Button } from "semantic-ui-react";
import Image from "next/image";
import styled from "styled-components";
import Web3 from "web3";
import Header from "./Header";
import icon from "../public/metamask.png";

import "semantic-ui-css/semantic.min.css";

const DivStyled = styled.div`
  margin-top: 10px;
`;

const CenterDiv = styled.div`
  text-align: center;
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
    <CenterDiv>
      <Button onClick={props.connect} color="teal">
        Connect to Metamask
      </Button>
      <DivStyled>
        <Image src={icon} width={50} height={50} />
      </DivStyled>
    </CenterDiv>
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
  }, [address]);

  return (
    <div>
      <Container>
        <Header signer={address} />
        {!hasMetamask && <NoMetamask />}
        {hasMetamask && !isConnected && <NoConnection connect={connect} />}
        {hasMetamask && isConnected && props.children}
      </Container>
    </div>
  );
};

export default Layout;
