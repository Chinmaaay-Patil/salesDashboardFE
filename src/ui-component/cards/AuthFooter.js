/** @format */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { Typography, useTheme } from '@mui/material';

export default function Footer() {
  const theme = useTheme();

  const drawerWidth = 240;

  return (
    <AppBar
      className="footer-layout-wrapper"
      position="fixed"
      color="primary"
      sx={{
        position: 'fixed',
        top: 'auto',
        bottom: 0,
        height: '30px',
        border: '1px solid #d4dfff',
        background: '#fafafa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end',

        // width: open ? `calc(100% - ${drawerWidth}px)` : '100%',

        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      }}
    >
      <Typography sx={{ mr: 4 }} variant="h6">
        {' '}
        &copy; sales dahboard @ 2024 All Rights Reserved
      </Typography>
    </AppBar>
  );
}
