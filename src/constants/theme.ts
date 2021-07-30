import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    secondary: {
      light: "#b5dbff",
      main: "#80aaff",
      dark: "#4a7bcb",
      contrastText: "#000",
    },
    primary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default theme;
