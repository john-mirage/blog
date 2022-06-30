import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'RedHatDisplay';
    src: url("../assets/fonts/RedHatDisplayVF.woff2") format('woff2-variations');
    font-weight: 300 900;
    font-style: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: 'RedHatDisplay';
    src: url("../assets/fonts/RedHatDisplayVF-Italic.woff2") format('woff2-variations');
    font-weight: 300 900;
    font-style: italic;
    font-display: fallback;
  }

  @font-face {
    font-family: 'RedHatText';
    src: url("../assets/fonts/RedHatTextVF.woff2") format('woff2-variations');
    font-weight: 300 700;
    font-style: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: 'RedHatText';
    src: url("../assets/fonts/RedHatTextVF-Italic.woff2") format('woff2-variations');
    font-weight: 300 700;
    font-style: italic;
    font-display: fallback;
  }

  @font-face {
    font-family: 'RedHatMono';
    src: url("../assets/fonts/RedHatMonoVF.woff2") format('woff2-variations');
    font-weight: 300 700;
    font-style: normal;
    font-display: fallback;
  }

  @font-face {
    font-family: 'RedHatMono';
    src: url("../assets/fonts/RedHatMonoVF-Italic.woff2") format('woff2-variations');
    font-weight: 300 700;
    font-style: italic;
    font-display: fallback;
  }

  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-weight: 400;
  }
`;

export default GlobalStyle;
