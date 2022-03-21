import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import styled from "styled-components";
import { Link } from "../routes";
import { showFriendlyAddress } from "../common/utils";

const ConnectionInfo = styled.p`
  text-align: right;
  font-size: 14px;
  color: #1678c2;
`;
const Header = ({ signer }) => {
  return (
    <>
      <Menu style={{ marginTop: "10px" }}>
        <Link route="/">
          <a className="item">CrowdCoin</a>
        </Link>
        <Menu.Menu position="right">
          <Link route="/">
            <a className="item">Campaigns</a>
          </Link>

          <Link route="/campaigns/new">
            <a className="item">+</a>
          </Link>
        </Menu.Menu>
      </Menu>
      <ConnectionInfo>
        You are logged as {showFriendlyAddress(signer)}
      </ConnectionInfo>
    </>
  );
};

// Prop types definition
Header.propTypes = {
  signer: PropTypes.string.isRequired,
};

export default Header;
