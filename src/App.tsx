import React from "react";
import GlobalStyle from "./globalStyles";
import Header from "./layouts/Header";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";
import styled from "styled-components";
import { NAVBAR_HEIGHT } from "./constants/offsets";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Main>
            <Routes />
          </Main>
        </BrowserRouter>
      </Provider>
      <GlobalStyle />
    </React.Fragment>
  );
}

const Main = styled.div`
  height: calc(100vh - ${NAVBAR_HEIGHT}px);
  margin-top: ${NAVBAR_HEIGHT}px;
`;

export default App;
