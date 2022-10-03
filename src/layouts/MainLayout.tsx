import React from "react";
import styled from "styled-components";

const MainLayout = (props: React.PropsWithChildren) => {
  return <MainContainer>{props.children}</MainContainer>;
};

const MainContainer = styled.div`
  padding: 56px 48px 120px;
`;

export default MainLayout;
