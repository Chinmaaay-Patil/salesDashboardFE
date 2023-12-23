import { TextField } from '@mui/material';
import React from 'react';

const DateComponent = ({ onChange, value, label }) => {
  return (
    <TextField
      InputLabelProps={{
        shrink: true
      }}
      label={label}
      size="small"
      sx={{ width: '100%' }}
      type="date"
      value={value}
      onChange={onChange}
    />
  );
};

export default DateComponent;
