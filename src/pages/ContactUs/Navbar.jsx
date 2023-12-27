import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
// import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
export default function Navbar() {
    return (
        <>
         <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h4" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <NavLink to="/">
            ATMOS
          </NavLink>
          </Typography>
          <nav className='homeNav' id='homeNav'>
          <NavLink to="/aboutUs">
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              About Us
            </Link>
            </NavLink>
            </nav>
            <nav className='homeNav' id='homeNav'>  
            <NavLink to="/contactUs">
            <Link
              variant="button"
              color="text.primary"
              sx={{ my: 1, mx: 1.5 }}
            >
              Contact Us
            </Link>
            </NavLink>
          </nav>
          <NavLink to="/login">
          <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </NavLink>
        </Toolbar>
      </AppBar>
        </>
    );
}