import { Typography } from '@mui/material';
import React from 'react';

function NoDataDisplay() {
  return (
    <Typography sx={{ textAlign: 'center' }} variant="h4">
      No Data To Display. Please Select Different Filter Range
    </Typography>
  );
}

export default NoDataDisplay;
