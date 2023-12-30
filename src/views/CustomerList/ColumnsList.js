import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Grid, IconButton, MenuItem, Tooltip } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import { Box } from '@mui/system';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import DateComponent from 'ui-component/DatePicker';
import { gridSpacing } from 'store/constant';
import { modifyAndDownloadDocument } from 'utils/apiCalls/modifyAndDownloadDocument';
import { handleDownloadClick } from 'utils/apiCalls/downloadQuotationFile';
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

const CustomerList = ({
  selectedColumns,
  setSelectedColumns,
  salesDashboardDataDates,
  setSalesDashboardDataDates,
  handleFilterOptionsChange,
  selected,
  setSelected
}) => {
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

  function handleDownloadDocument() {
    modifyAndDownloadDocument(selected[0]).then(() => {
      setTimeout(() => {
        handleDownloadClick().then(() => {
          setSelected([]);
        });
      }, 5000);
    });
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}>
      <Grid container spacing={gridSpacing}>
        <Grid item lg={3} md={6} sm={6} xs={12}>
          <DateComponent
            label="From Date"
            value={salesDashboardDataDates.fromDate}
            onChange={(e) => setSalesDashboardDataDates({ ...salesDashboardDataDates, fromDate: e.target.value })}
          />
        </Grid>{' '}
        <Grid item lg={3} md={6} sm={6} xs={12}>
          <DateComponent
            label="To Date"
            value={salesDashboardDataDates.toDate}
            onChange={(e) => setSalesDashboardDataDates({ ...salesDashboardDataDates, toDate: e.target.value })}
          />
        </Grid>{' '}
        <Grid item lg={3} md={6} sm={6} xs={12}>
          <Button
            variant="outlined"
            sx={{
              width: '100%',
              borderRadius: 3
            }}
            onClick={handleFilterOptionsChange}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', gap: 2, ml: 30 }}>
        {' '}
        <Tooltip title="Download Quotation">
          <IconButton
            color="secondary"
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="outlined"
            disableElevation
            size="large"
            disabled={selected.length === 0}
            onClick={handleDownloadDocument}
          >
            <ArrowCircleDownIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Click to configure  column visibility and change the sequence">
          <IconButton
            color="secondary"
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="outlined"
            disableElevation
            onClick={handleClick}
            size="large"
          >
            <DisplaySettingsIcon />
          </IconButton>
        </Tooltip>
      </Box>
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
