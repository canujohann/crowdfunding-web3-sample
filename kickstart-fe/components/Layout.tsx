import React from "react";
import { Container, Message, Button } from "semantic-ui-react";
import Image from "next/image";
import styled from "styled-components";

import Header from "./Header";
import useMetamask from "hooks/useMetamask";
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
        <Image src={MetamaskIcon} alt="metamask-icon" width={50} height={50} />
      </DivStyled>
    </CenterDiv>
  );
};

export type LayoutPropsType = {
  children?: React.ReactNode;
};

const Layout = (props: LayoutPropsType) => {
  const { children } = props;

  const { hasMetamask, isConnected, address, networkId, connect } =
    useMetamask();

  console.log(hasMetamask, isConnected, address, networkId, connect);

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
