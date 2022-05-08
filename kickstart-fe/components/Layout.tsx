import React, { useState, useEffect } from "react";
import { Container, Message, Button } from "semantic-ui-react";
import Image from "next/image";
import styled from "styled-components";

import Header from "./Header";
import MetamaskIcon from "../public/metamask.png";

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
      <Message.Header>Metamask required</Message.Header>
      <p>Please install Metamask and connect it to your browser.</p>
    </Message>
  );
};

const NoConnection = ({ connect }: { connect: () => Promise<void> }) => {
  return (
    <CenterDiv>
      <Button onClick={connect} color="blue">
        Connect to Metamask
      </Button>
      <DivStyled>
        <Image src={MetamaskIcon} alt="metamask-icon" width={50} height={50}/>
      </DivStyled>
    </CenterDiv>
  );
};

export type LayoutPropsType = {
  children?: React.ReactNode;
}

const Layout = (props: LayoutPropsType) => {
  const { children } = props;
  // States definition
  const [hasMetamask, setHasMetamask] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [networkId, setNetworkId] = useState("");

  // Connect dapp to metamask
  // TODO: Needs refactoring
  const connect = async () => {
    if (window.ethereum) {
      const requestAccountsResult = await window.ethereum.request<string[]>({
        method: "eth_requestrequestAccountsResult",
      }) ?? [];

      const account = requestAccountsResult?.length && requestAccountsResult[0] ? requestAccountsResult[0] : '';

      // Check if any change in accounts
      window.ethereum.on("accountsChanged", (accounts) => {
        // TODO: should be tested
        const currentAccount = accounts instanceof Array ? accounts[0] : '';
        setAddress(currentAccount);
      });

      // Set the address (first address from metamask)
      setAddress(account);

      // Set the network id
      setNetworkId(window.ethereum.networkVersion ?? "");
    }
  };

  // TODO: fix this function as the async is not working as expected
  useEffect(async () => {
    // Check if metamask is installed
    setHasMetamask(!!window.ethereum);

    // Check if metamask is connected
    const accounts: [] = await window.ethereum?.request({ method: "eth_accounts" }) ?? [];

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
        <Header signer={address} networkId={networkId} />
        {!hasMetamask && <NoMetamask />}
        {hasMetamask && !isConnected && <NoConnection connect={connect} />}
        {hasMetamask && isConnected && children}
      </Container>
    </div>
  );
};

export default Layout;
