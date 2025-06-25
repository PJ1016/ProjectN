import {
  CssBaseline,
  ThemeProvider,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Product from "./components/Product";
import HomePage from "./containers/HomePage";
import { theme } from "./components/theme";

function App() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              Project #N
            </Typography>
            {isMobile ? (
              <>
                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                    Home
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/product"
                    onClick={handleMenuClose}
                  >
                    Products
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/safety"
                    onClick={handleMenuClose}
                  >
                    Safety Resources
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/support"
                    onClick={handleMenuClose}
                  >
                    Support
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/product">
                  Products
                </Button>
                <Button color="inherit" component={Link} to="/safety">
                  Safety Resources
                </Button>
                <Button color="inherit" component={Link} to="/support">
                  Support
                </Button>
              </Box>
            )}
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
