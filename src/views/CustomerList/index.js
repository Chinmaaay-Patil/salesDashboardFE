import React from 'react';
import DummyDataTable from './CustomerDataListTable';
import { Box, Typography } from '@mui/material';
import ColumnsList from './ColumnsList';
import { useState } from 'react';

function CustomerList() {
  const columns = [
    { id: 'LabName', label: 'Lab Name', visible: true },
    { id: 'OwnerName', label: 'Owner Name', visible: true },
    { id: 'Mobile', label: 'Mobile', visible: true },
    { id: 'Email', label: 'Email', visible: true },
    { id: 'Address', label: 'Address', visible: true },
    { id: 'Date', label: 'Date', visible: true },
    { id: 'SourceOfLead', label: 'Source of Lead', visible: true },
    { id: 'SourcePersonName', label: 'Source Person', visible: true },
    { id: 'Version', label: 'Version', visible: true },
    { id: 'Amount', label: 'Amount', visible: true },
    { id: 'SalesPerson', label: 'Sales Person', visible: true },
    { id: 'State', label: 'State', visible: true },
    { id: 'DetailRequirement', label: 'Detail Requirement', visible: true },
    { id: 'Comment', label: 'Comment', visible: true },
    { id: 'FollowupDate', label: 'Follow-up Date', visible: true }
  ];
  const [selectedColumns, setSelectedColumns] = useState(() => columns.map((column) => ({ ...column, visible: true }))); // Initialize with all columns visible

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h3">Customer List</Typography>
        <ColumnsList selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns} columns={columns} />
      </Box>

      <DummyDataTable selectedColumns={selectedColumns} />
    </Box>
  );
}

export default CustomerList;
