import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Lato, sans-serif",
    h1: {
      fontFamily: "Playfair Display, serif",
      fontWeight: 600,
      color: "#2A5945",
    },
    button: {
      fontFamily: "Poppins, sans-serif",
      textTransform: "none",
      fontWeight: 500,
    },
  },
  palette: {
    background: {
      default: "#F4FBF7",
      paper: "#E6F2EA",
    },
    primary: {
      main: "#5CA183",
    },
    secondary: {
      main: "#D9F0E4",
    },
    text: {
      primary: "#2E3C32",
      secondary: "#6D8E7E",
    },
  },
  shape: {
    borderRadius: 8,
  },
});
