import { createGlobalStyle } from "styled-components";
import Colors from "./constants/colors";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&display=swap');

  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    background: ${Colors.BLACK_SECONDARY};
    font-family: 'Roboto', sans-serif;
    color: ${Colors.WHITE};
  }
`;

export default GlobalStyle;
