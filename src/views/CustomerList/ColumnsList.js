// import React from 'react';
// import { Box, Checkbox, FormControlLabel } from '@mui/material';

// function ColumnsList({ selectedColumns, setSelectedColumns, columns }) {
//   const handleToggleColumnVisibility = (columnId) => {
//     const updatedColumns = selectedColumns.map((column) => {
//       if (column.id === columnId) {
//         return { ...column, visible: !column.visible };
//       }
//       return column;
//     });

//     setSelectedColumns(updatedColumns);
//   };

//   return (
//     <Box>
//       {columns.map((column) => (
//         <FormControlLabel
//           key={column.id}
//           control={
//             <Checkbox
//               checked={selectedColumns.find((c) => c.id === column.id)?.visible || false}
//               onChange={() => handleToggleColumnVisibility(column.id)}
//             />
//           }
//           label={column.label}
//         />
//       ))}
//     </Box>
//   );
// }

// export default ColumnsList;

import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CheckBox } from '@mui/icons-material';
import { Checkbox, FormControlLabel } from '@mui/material';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
      }
    }
  }
}));

export default function CustomizedMenus({ selectedColumns, setSelectedColumns, columns }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleToggleColumnVisibility = (columnId) => {
    const updatedColumns = selectedColumns.map((column) => {
      if (column.id === columnId) {
        return { ...column, visible: !column.visible };
      }
      return column;
    });

    setSelectedColumns(updatedColumns);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Show/hide columns
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        PaperProps={{
          style: {
            maxHeight: 40 * 4.5,
            width: '20ch'
          }
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {columns.map((column) => (
          <MenuItem disableRipple>
            <FormControlLabel
              key={column.id}
              control={
                <Checkbox
                  checked={selectedColumns.find((c) => c.id === column.id)?.visible || false}
                  onChange={() => handleToggleColumnVisibility(column.id)}
                />
              }
              label={column.label}
            />
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
