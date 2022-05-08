import React from "react";
import { Menu, Button, Icon, Message } from "semantic-ui-react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

import { showFriendlyAddress, showNetworkName } from "../common/utils";
import CoinStarterLogo from "../public/coin-starter-logos.png";

const TitleStyled = styled.p`
  color: #45cbb2;
  font-size: 1.5em;
`;

export type HeaderPropsType = {
  signer: string;
  networkId: string;
};

const Header = (props: HeaderPropsType) => {
  const { signer, networkId } = props;

  return (
    <>
      <Menu icon="labeled" secondary style={{ marginTop: "10px" }}>
        <Link href="/">
          <a className="item">
            <Image width="50" height="50" src={CoinStarterLogo} alt="header-logo"/>
          </a>
        </Link>
        <Menu.Item>
          <TitleStyled>Coin starter</TitleStyled>
        </Menu.Item>
        <Menu.Menu position="right">
          {signer && (
            <>
              <Menu.Item>
                <Button inverted color="blue">
                  You are logged as {showFriendlyAddress(signer)}
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Button inverted color="purple">
                  Network : {showNetworkName(networkId)}
                </Button>
              </Menu.Item>
            </>
          )}
          <Link href="/">
            <a className="item">
              <Icon name="eye" />
              Top
            </a>
          </Link>
          <Link href="/campaigns">
            <a className="item">
              <Icon name="list" />
              Campaigns
            </a>
          </Link>

          <Link href="/campaigns/new">
            <a className="item">
              <Icon name="add square" />
              New campaign
            </a>
          </Link>
        </Menu.Menu>
      </Menu>
      <Message color="red" size="mini">
        <p>
          You are not on the real ethereum network, but on &quot;
          {showNetworkName(networkId)}&quot;. Be careful !
        </p>
      </Message>
    </>
  );
};

export default Header;
