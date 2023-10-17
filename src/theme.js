export const theme = {
  palette: {
    primary: {
      main: "#03989E",
      black: '#000000',
    },
    secondary: {
      lighter: "#d9f7fc",
      main: "#f3f5f9",
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
    fontFamily: `"Poppins", "Poppins-Light", sans-serif`,
    h1: {
      fontFamily: "Poppins",
      fontWeight: 900,
    },
    h2: {
      fontFamily: "Poppins",
      fontWeight: 900,
      fontSize: '2rem',
      '@media (min-width: 600px)': {
        fontSize: '2rem'
      }
    },
    h3: {
      fontFamily: "Poppins",
      fontWeight: 900,
    },
    h4: {
      fontFamily: "Poppins",
      fontWeight: 900,
      fontSize: '1.75rem',
      '@media (min-width: 600px)': {
        fontSize: '1.75rem'
      }
    },
    h5: {
      fontFamily: "Poppins",
      fontWeight: 900,
      fontSize: '1.5rem',
      '@media (min-width: 600px)': {
        fontSize: '1.5rem'
      }
    },
    h6: {
      fontFamily: "Poppins",
      fontWeight: 700,
      letterSpacing: 0.5,
    },
    p: {
      fontFamily: 'Poppins-Light',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: '1.5rem',
    },
    base: {
      fontFamily: 'Poppins-Light',
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
    body1: {
      fontFamily: 'Poppins-Light',
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: '1.5rem',
    },
   
  },
};
