import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, MenuItem, Tooltip } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : 'none',
  cursor: 'move',

  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'none',
  cursor: 'move'
});

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

const CustomerList = ({ selectedColumns, setSelectedColumns }) => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    setCustomers(selectedColumns);
  }, []);

  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newCustomers = [...customers];
    const [movedCustomer] = newCustomers.splice(result.source.index, 1);
    newCustomers.splice(result.destination.index, 0, movedCustomer);
    setCustomers(newCustomers);
    setSelectedColumns(newCustomers);
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Tooltip title="Click to configure  column visibility and change the sequence">
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
          Configure columns
        </Button>
      </Tooltip>
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
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                {customers.map((customer, index) => (
                  <Draggable key={customer.id} draggableId={customer.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        <MenuItem disableRipple sx={{ cursor: 'move' }}>
                          <FormControlLabel
                            key={customer.id}
                            control={
                              <Checkbox
                                checked={selectedColumns.find((c) => c.id === customer.id)?.visible || false}
                                onChange={() => handleToggleColumnVisibility(customer.id)}
                              />
                            }
                            label={customer.label}
                          />
                        </MenuItem>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>{' '}
      </StyledMenu>
    </div>
  );
};

export default CustomerList;
