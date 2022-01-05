export const theme = {
  palette: {
    primary: {
      main: "#03989E",
    },
    secondary: {
      lighter: "#d9f7fc",
      main: "#a6dbe5",
    },
    success: {
      main: "#ACC966",
    },
    warning: {
      main: "#F9C171",
    },
    info: { main: "#F4DAC9" },
    error: {
      main: "#BC4749",
    },
    lightBackground: {
      main: "#fcf5f0",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.78)",
    },
  },
  typography: {
    fontFamily: `"Work Sans", "Montserrat", sans-serif`,
    h1: {
      fontFamily: "Work Sans",
      fontWeight: 900,
    },
    h2: {
      fontFamily: "Work Sans",
      fontWeight: 900,
    },
    h3: {
      fontFamily: "Work Sans",
      fontWeight: 900,
    },
    h4: {
      fontFamily: "Work Sans",
      fontWeight: 900,
    },
    h5: {
      fontFamily: "Work Sans",
      fontWeight: 900,
    },
    h6: {
      fontFamily: "Work Sans",
      fontWeight: 700,
      letterSpacing: 0.5,
    },
    body1: {
      fontFamily: "Montserrat",
      fontWeight: 300,
    },
    body2: {
      fontFamily: "Montserrat",
      fontWeight: 300,
    },
    subtitle1: {
      fontFamily: "Montserrat",
      fontWeight: 300,
    },
    subtitle2: {
      fontFamily: "Montserrat",
      fontWeight: 300,
    },
    button: {
      fontFamily: "Montserrat",
      fontWeight: 300,
    },
    caption: {
      fontFamily: "Montserrat",
      fontWeight: 300,
    },
    overline: {
      fontFamily: "Montserrat",
      fontWeight: 300,
    },
  },
  components: {
     MuiAppBar: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(18px)',
          background: 'linear-gradient(88.85deg, #4295E0 0.2%, rgba(13, 51, 147, 0.75) 100%)'
        }
      }
    },
  }
};
