import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
    };
    fonts: {
      display: string;
      text: string;
      mono: string;
    };
  }
}
