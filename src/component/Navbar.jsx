import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (path) => {
    setAnchorEl(null);
    if (path) {
      if (path === 'logout') {
        handleLogout();
      } else {
        navigate(path);
      }
    }
  };

  return (
    <AppBar position="static" className={styles.navbar}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" className={styles.logo} onClick={() => navigate('/products')}>
          Ecommerce
        </Typography>

        <Box className={styles.navLinks}>
          <Button color="inherit" onClick={() => navigate('/products')}>Products</Button>
          <Button color="inherit" onClick={() => navigate('/edit-profile')}>Profile</Button>
          <Button color="inherit" onClick={() => navigate('/change-password')}>Change Password</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Box>

        <Box className={styles.mobileMenu}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => handleMenuClose()}
          >
            <MenuItem onClick={() => handleMenuClose('/products')}>Products</MenuItem>
            <MenuItem onClick={() => handleMenuClose('/edit-profile')}>Profile</MenuItem>
            <MenuItem onClick={() => handleMenuClose('/change-password')}>Change Password</MenuItem>
            <MenuItem onClick={() => handleMenuClose('logout')}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
