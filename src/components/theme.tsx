import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Lato, sans-serif",
    h1: {
      fontFamily: "Playfair Display, serif",
      fontWeight: 600,
      color: "#d63384",
    },
    button: {
      fontFamily: "Poppins, sans-serif",
      textTransform: "none",
      fontWeight: 500,
    },
  },
  palette: {
    background: {
      default: "#fef7f7",
      paper: "#fff0f6",
    },
    primary: {
      main: "#ff6b9d",
    },
    secondary: {
      main: "#ffc1cc",
    },
    text: {
      primary: "#495057",
      secondary: "#6c757d",
    },
  },
  shape: {
    borderRadius: 12,
  },
});
