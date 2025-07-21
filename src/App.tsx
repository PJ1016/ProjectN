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
  Avatar,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Spa } from "@mui/icons-material";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Product from "./components/Product";
import HomePage from "./containers/HomePage";
import { theme } from "./components/theme";
import { Posts } from "./services/posts";
import { usePageView } from "./services/usePageView";
import { AuthProvider } from "./contexts/AuthContext";
import { Provider } from "react-redux";
import { store } from "./store";
import { AuthButton } from "./components/AuthButton";
import AdminPage from "./containers/AdminPage";
import { useAppSelector } from "./store/hooks";
import { CartIcon } from "./components/Cart";
import Cart from "./pages/Cart";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

function AppContent() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const { isAdmin } = useAppSelector(state => state.admin);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  usePageView();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, gap: 1 }}>
            <Spa sx={{ color: 'success.main', fontSize: 32 }} />
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", color: 'white' }}
            >
              PureFlow
            </Typography>
          </Box>
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
                <MenuItem
                  component={Link}
                  to="/cart"
                  onClick={handleMenuClose}
                >
                  Cart
                </MenuItem>
                {isAdmin && (
                  <MenuItem
                    component={Link}
                    to="/admin"
                    onClick={handleMenuClose}
                  >
                    Admin
                  </MenuItem>
                )}
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
              {isAdmin && (
                <Button color="inherit" component={Link} to="/admin">
                  Admin
                </Button>
              )}
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CartIcon />
            <AuthButton />
          </Box>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={isAdmin ? <AdminPage /> : <h1>Access Denied</h1>} />
        <Route path="*" element={<h1>Sorry</h1>} />
        <Route path="posts" element={<Posts />} />
      </Routes>
    </>
  );
}

export default App;
