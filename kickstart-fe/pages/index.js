import React from "react";
import Image from "next/image";
import styled from "styled-components";

import logo from "../public/coin-starter-logos_black.png";
import Layout from "../components/Layout";

const LogoWrapperStyled = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Index = (props) => {
  return (
    <Layout>
      <LogoWrapperStyled>
        <Image src={logo} alt="Coin starter top" />
      </LogoWrapperStyled>
    </Layout>
  );
};

export default Index;
