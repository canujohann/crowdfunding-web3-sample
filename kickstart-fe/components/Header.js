import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

const Header = ({ signer }) => {
  return (
    <>
      <Menu style={{ marginTop: "10px" }}>
        <Link route="/">
          <a className="item">CrowdCoin</a>
        </Link>
        <Menu.Item name={`Your address is ${signer}`} active={true} />
        <Menu.Menu position="right">
          <Link route="/">
            <a className="item">Campaigns</a>
          </Link>

          <Link route="/campaigns/new">
            <a className="item">+</a>
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
