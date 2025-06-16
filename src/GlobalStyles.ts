import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #000; /* Optional: Set a dark background for contrast */
    color: white; /* Global text color */
    font-family: 'Arial', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, p, span, div {
    color: inherit; /* Inherit the global text color */
  }
`;

export default GlobalStyles;