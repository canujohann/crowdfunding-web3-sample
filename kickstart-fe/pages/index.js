import React from "react";
import Image from "next/image";
import logo from "../public/coin-starter-logos_black.png";
import styled from "styled-components";
import Layout from "../components/Layout";

const LogoWrapperStyled = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Index = (props) => {
  return (
    <Layout>
      <LogoWrapperStyled>
        <Image src={logo} />
      </LogoWrapperStyled>
    </Layout>
  );
};

export default Index;
