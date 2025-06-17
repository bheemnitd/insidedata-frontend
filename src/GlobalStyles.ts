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

  /* Base text elements */
  h1, h2, h3, h4, h5, h6, p, span, div, a {
    color: white;
  }

  /* Specific overrides */
  input, textarea {
    color: #333;
    background: white;
  }

  /* Links */
  // a {
  //   color: white;
  //   text-decoration: none;
  //   color: #00fff7;
  // }

  /* Form elements */
  button {
    color: #333;
  }

  /* Modal content */
  .modal-content {
    color: #333;
  }

  /* Table elements */
  th, td {
    color: white;
  }
`;

export default GlobalStyles;