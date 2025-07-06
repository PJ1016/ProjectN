import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b9d, #ff8fab)",
  color: "white",
  padding: "16px 32px",
  borderRadius: "25px",
  fontSize: "18px",
  fontWeight: 600,
  textTransform: "none",
  boxShadow: "0 4px 15px rgba(255, 107, 157, 0.3)",
  "&:hover": {
    background: "linear-gradient(45deg, #ff5a8a, #ff7d98)",
    transform: "translateY(-2px)",
  },
}));