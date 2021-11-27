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
      blue: string;
      yellow: string;
    };

    round: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
    };

    spacing: {
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
    };
  }
}
