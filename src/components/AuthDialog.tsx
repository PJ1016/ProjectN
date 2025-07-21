import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const AuthDialog = ({
  open,
  onClose,
  title = "Login Required",
  message = "Please sign in to continue",
}: AuthDialogProps) => {
  const { signInWithGoogle } = useAuth();

  const handleLogin = async () => {
    await signInWithGoogle();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", color: "primary.main" }}>
        {title}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ textAlign: "center", py: 2 }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {message}
          </Typography>
          <Button
            variant="contained"
            startIcon={<Google />}
            onClick={handleLogin}
            sx={{
              background: "linear-gradient(45deg, #e91e63, #f06292)",
              color: "white",
              py: 1.2,
              px: 3,
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "16px",
              boxShadow: "0 4px 15px rgba(233, 30, 99, 0.4)",
              "&:hover": {
                background: "linear-gradient(45deg, #c2185b, #e91e63)",
                boxShadow: "0 6px 20px rgba(233, 30, 99, 0.6)",
              },
            }}
          >
            Sign in with Google
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};