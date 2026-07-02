import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const dashboardPath =
    auth?.user?.role === "admin" ? "/dashboard/admin" : "/dashboard/user";

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    setAuth({ user: null, token: "", role: "" });
    localStorage.removeItem("auth");
    navigate("/login");
    handleMenuClose();
  };
  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Category", path: "/category" },
    { label: `Cart(${cartCount})`, path: "/cart" },
  ];

  const drawerList = (
    <Box sx={{ width: 280 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navLinks.map(({ label, path }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton component={Link} to={path}>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}

        {auth?.user && (
          <ListItem disablePadding>
            <ListItemButton component={Link} to={dashboardPath}>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        )}

        {!auth?.user && (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/register">
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={4}>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={toggleDrawer(true)}
            sx={{
              color: "#fff",
              mr: 2,
              padding: "10px",
              borderRadius: "10px",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
                transform: "scale(1.05)",
              },
            }}
          >
            <MenuIcon sx={{ fontSize: 28 }} />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            E-commerce App
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
            {navLinks.map(({ label, path }) => (
              <Button
                key={label}
                color="inherit"
                component={Link}
                to={path}
                className="nav-btn"
              >
                {label}
              </Button>
            ))}

            {!auth?.user ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  className="nav-btn"
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/register"
                  className="nav-btn"
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={handleMenuOpen}
                  className="nav-btn"
                >
                  {auth.user.role}
                </Button>

                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MenuItem
                    onClick={() => {
                      navigate(dashboardPath);
                      handleMenuClose();
                    }}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
  anchor="left"
  open={drawerOpen}
  onClose={toggleDrawer(false)}
  PaperProps={{
    sx: {
      backgroundColor: "#0f172a",
      color: "#fff",
    },
  }}
>
        {drawerList}
      </Drawer>
    </Box>
  );
}

export default Navbar;
