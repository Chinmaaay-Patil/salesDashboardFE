import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import renderCustomerTableDataListTableBody from 'utils/renderCustomerTableDataListTableBody';

export default function EnhancedTable({ selectedColumns, salesTrackData }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('LabName');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);

  //   const [columns, setColumns] = React.useState([
  //     { id: 'LabName', label: 'Lab Name', visible: true },
  //     { id: 'OwnerName', label: 'Owner Name', visible: true },
  //     { id: 'Mobile', label: 'Mobile', visible: true },
  //     { id: 'Email', label: 'Email', visible: true },
  //     { id: 'Address', label: 'Address', visible: true },
  //     { id: 'Date', label: 'Date', visible: true },
  //     { id: 'SourceOfLead', label: 'Source of Lead', visible: true },
  //     { id: 'SourcePersonName', label: 'Source Person', visible: true },
  //     { id: 'Version', label: 'Version', visible: true },
  //     { id: 'Amount', label: 'Amount', visible: true },
  //     { id: 'SalesPerson', label: 'Sales Person', visible: true },
  //     { id: 'State', label: 'State', visible: true },
  //     { id: 'DetailRequirement', label: 'Detail Requirement', visible: true },
  //     { id: 'Comment', label: 'Comment', visible: true },
  //     { id: 'FollowupDate', label: 'Follow-up Date', visible: true }
  //   ]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(salesTrackData);
  }, [salesTrackData]);

  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            {/* <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all labs'
              }}
            /> */}
          </TableCell>
          {selectedColumns.map(
            (column) =>
              column.visible && (
                <TableCell
                  sx={{ fontWeight: 700 }}
                  key={column.id}
                  align="left"
                  padding="normal"
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                    {orderBy === column.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              )
          )}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const isSelected = selected === id;
    const newSelected = isSelected ? null : id;
    setSelected([newSelected]);

    console.log('iddddd', id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => {
    return selected[0]?.id === id;
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const [visibleRows, setVisibleRows] = useState([]);

  useEffect(() => {
    const temp = stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    setVisibleRows(temp);
    // eslint-disable-next-line
  }, [order, orderBy, page, rowsPerPage, rows]);
  // const visibleRows = React.useMemo(
  //   () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
  //   [order, orderBy, page, rowsPerPage]
  // );
  // Inside EnhancedTable component

  // ... (inside the component)
  const minHeightTable = '65vh';
  return (
    <Box sx={{ width: '100%', minHeight: minHeightTable }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer sx={{ height: minHeightTable }}>
          <Table sx={{ minWidth: 750, minHeight: minHeightTable }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId
                        }}
                      />
                    </TableCell>
                    {selectedColumns.map((column) => {
                      return (
                        column.visible && renderCustomerTableDataListTableBody(column, row)
                        // <TableCell key={column.id} align="left" padding="normal">
                        //   {row[column.id]}
                        // </TableCell>ss
                      );
                    })}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows
                  }}
                >
                  <TableCell colSpan={selectedColumns.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
