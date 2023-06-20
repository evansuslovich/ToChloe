import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../app/services/api/authApi';
import { selectIsLoggedIn, setUser } from '../../app/services/slices/authSlice';

// to save us typing redundant info when using MUI <Menu>s
const defaultMenuOriginProps = {
  anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
  transformOrigin: { vertical: 'top', horizontal: 'right' },
};

const UserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = async () => {
    await logout().unwrap();
    dispatch(setUser(null));
    navigate('/');
    enqueueSnackbar("You've been logged out", { variant: 'info' });
    // need to save the new csrf Token
    setAnchorElUser(null);
  };

  let content;
  if (isLoggedIn) {
    content = (
      <>
        <IconButton onClick={handleOpenUserMenu} color="contrast" aria-label="user"><PersonIcon /></IconButton>
        <Menu
          id="user-menu"
          open={Boolean(anchorElUser)}
          anchorEl={anchorElUser}
          anchorOrigin={defaultMenuOriginProps.anchorOrigin}
          transformOrigin={defaultMenuOriginProps.transformOrigin}
          keepMounted
          onClose={handleCloseUserMenu}
        >
          <MenuItem component={NavLink} to="account" onClick={handleCloseUserMenu}>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            Logout
          </MenuItem>
        </Menu>
      </>
    );
  } else {
    content = (
      <Button
        component={Link}
        to="/sign-in"
        sx={{
          variant: "outlined",
          color: "contrast"
        }}
      >
        Login
      </Button>
    );
  }

  return content;
};

export default UserMenu;

//  variant="outlined">