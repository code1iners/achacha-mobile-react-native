import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    // colors.
    colors: {
      mainBackgroundColor: string;
      textColor: string;
      primary: string;
      secondary: string;
      accentColor: string;
    };

    round: {
      L: string;
      M: string;
      S: string;
    };
  }
}
