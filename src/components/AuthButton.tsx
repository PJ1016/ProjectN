import { Button, Avatar, Box, Typography, styled } from "@mui/material";
import { Google, Logout, Person } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

const StyledLoginButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #e91e63, #f06292)",
  color: "white",
  padding: "12px 24px",
  borderRadius: "25px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "16px",
  boxShadow: "0 4px 15px rgba(233, 30, 99, 0.4)",
  border: "3px solid white",
  [theme.breakpoints.down("sm")]: {
    padding: "8px 16px",
    fontSize: "14px",
    minWidth: "auto",
  },
  "&:hover": {
    background: "linear-gradient(45deg, #c2185b, #e91e63)",
    boxShadow: "0 6px 20px rgba(233, 30, 99, 0.6)",
    transform: "translateY(-2px)",
  },
  transition: "all 0.3s ease",
}));

const StyledUserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  background: "linear-gradient(45deg, #fce4ec, #f8bbd9)",
  padding: "8px 16px",
  borderRadius: "25px",
  border: "2px solid #e91e63",
  boxShadow: "0 2px 10px rgba(233, 30, 99, 0.3)",
  [theme.breakpoints.down("sm")]: {
    gap: "8px",
    padding: "6px 12px",
  },
}));

const StyledLogoutButton = styled(Button)(({ theme }) => ({
  background: "transparent",
  color: "#e91e63",
  padding: "6px 16px",
  borderRadius: "20px",
  textTransform: "none",
  fontWeight: 500,
  fontSize: "14px",
  "&:hover": {
    background: "rgba(233, 30, 99, 0.1)",
  },
}));

export const AuthButton = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  if (user) {
    return (
      <StyledUserBox>
        <Avatar
          src={user.photoURL || undefined}
          sx={{ width: 32, height: 32, border: "2px solid #e91e63" }}
        >
          <Person sx={{ color: "#e91e63" }} />
        </Avatar>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography
            variant="body2"
            sx={{ color: "#e91e63", fontWeight: 600, fontSize: "14px" }}
          >
            {user.displayName || "Welcome, Naturally!"}
          </Typography>
        </Box>
        <StyledLogoutButton
          onClick={logout}
          startIcon={<Logout />}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          Logout
        </StyledLogoutButton>
        <StyledLogoutButton
          onClick={logout}
          sx={{
            display: { xs: "flex", sm: "none" },
            minWidth: "auto",
            padding: "4px 8px",
          }}
        >
          <Logout sx={{ fontSize: 18 }} />
        </StyledLogoutButton>
      </StyledUserBox>
    );
  }

  return (
    <StyledLoginButton onClick={signInWithGoogle} startIcon={<Google />}>
      Join Nature's Circle
    </StyledLoginButton>
  );
};
