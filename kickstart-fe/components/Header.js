import React from "react";
import PropTypes from "prop-types";
import { Menu, Button, Icon } from "semantic-ui-react";
import Image from "next/image";
import styled from "styled-components";
import { Link } from "../routes";
import { showFriendlyAddress } from "../common/utils";
import logo from "../public/coin-starter-logos.png";

const TitleStyled = styled.p`
  color: #45cbb2;
  font-size: 1.5em;
`;

const Header = ({ signer }) => {
  return (
    <>
      <Menu icon="labeled" secondary style={{ marginTop: "10px" }}>
        <Link route="/">
          <a className="item">
            <Image width="50" height="50" src={logo} />
          </a>
        </Link>
        <Menu.Item>
          <TitleStyled>Coin starter</TitleStyled>
        </Menu.Item>
        <Menu.Menu position="right">
          {signer && (
            <Menu.Item>
              <Button inverted color="blue">
                You are logged as {showFriendlyAddress(signer)}
              </Button>
            </Menu.Item>
          )}
          <Link route="/">
            <a className="item">
              <Icon name="eye" />
              Top
            </a>
          </Link>
          <Link route="/campaigns">
            <a className="item">
              <Icon name="list" />
              Campaigns
            </a>
          </Link>

          <Link route="/campaigns/new">
            <a className="item">
              <Icon name="add square" />
              New campaign
            </a>
          </Link>
        </Menu.Menu>
      </Menu>
    </>
  );
};

// Prop types definition
Header.propTypes = {
  signer: PropTypes.string.isRequired,
};

export default Header;
