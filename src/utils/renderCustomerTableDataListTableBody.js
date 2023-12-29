import { TableCell } from '@mui/material';

function renderCustomerTableDataListTableBody(column, row) {
  const textIfDataNotFound = 'Data Not Entered';

  switch (column.id) {
    case 'followupdate':
    case 'createddate':
      return (
        <TableCell key={column.id} align="left" padding="normal">
          {row[column.id]
            ? `${new Date(row[column.id]).getFullYear()}-${String(new Date(row[column.id]).getMonth() + 1).padStart(2, '0')}-${String(
                new Date(row[column.id]).getDate()
              ).padStart(2, '0')}`
            : textIfDataNotFound}
        </TableCell>
      );

    case 'salesPersonId': {
      return (
        <TableCell key={column.id} align="left" padding="normal">
          {row[column.id] && row[column.id].salesPersonName ? row[column.id].salesPersonName : textIfDataNotFound}
        </TableCell>
      );
    }

    case 'sourceId': {
      return (
        <TableCell key={column.id} align="left" padding="normal">
          {row[column.id] && row[column.id].sourceName ? row[column.id].sourceName : textIfDataNotFound}
        </TableCell>
      );
    }
    case 'versionId': {
      return (
        <TableCell key={column.id} align="left" padding="normal">
          {row[column.id] && row[column.id].vesionName ? row[column.id].vesionName : textIfDataNotFound}
        </TableCell>
      );
    }
    case 'stateId': {
      return (
        <TableCell key={column.id} align="left" padding="normal">
          {row[column.id] && row[column.id].stateName ? row[column.id].stateName : textIfDataNotFound}
        </TableCell>
      );
    }
    // Add more cases for other columns as needed
    default:
      return (
        <TableCell key={column.id} align="left" padding="normal">
          {row[column.id] ? row[column.id] : textIfDataNotFound}
        </TableCell>
      );
  }
}

export default renderCustomerTableDataListTableBody;
