import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PenguinTheme } from 'penguinfinance-uikit2/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PenguinTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  // #root {
  //   position: absolute;
  //   top: 0;
  //   bottom: 0;
  //   left: 0;
  //   right: 0;
  //   overflow: auto;
  //   overflow-x: hidden;
  // }
  body {
    background-color: ${({ theme }) => theme.colors.background};
    background: ${({ theme }) => theme.isDark && '#171027'};
    img {
      height: auto;
      max-width: 100%;
    }
    // overflow: hidden;
  }
  // custom fonts
  @font-face {
    font-family: 'GothamBold Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Gotham-Bold.woff) format('truetype');
    font-display: swap;
  }
  @font-face {
    font-family: 'GothamBlack Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Gotham-Black.woff) format('truetype');
    font-display: swap;
  }
  @font-face {
    font-family: 'GothamUltra Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Gotham-Ultra.woff) format('truetype');
    font-display: swap;
  }
  @font-face {
    font-family: 'Telegraf UltraLight';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-UltraLight.woff) format('truetype');
    font-display: swap;
  }
  @font-face {
    font-family: 'Telegraf Regular Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-Regular.woff) format('truetype');
    font-display: swap;
  }
  @font-face {
    font-family: 'Telegraf Bold';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-Bold.woff) format('truetype');
    font-display: swap;
  }
  @font-face {
    font-family: 'Telegraf UltraBold Font';
    src: url(${process.env.PUBLIC_URL}/fonts/Telegraf-UltraBold.woff) format('truetype');
    font-display: swap;
  }
`

export default GlobalStyle
