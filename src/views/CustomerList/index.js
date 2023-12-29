import React from 'react';
import DummyDataTable from './CustomerDataListTable';
import { Box, Typography } from '@mui/material';
import ColumnsList from './ColumnsList';
import { useState } from 'react';
import { useEffect } from 'react';
import { getSalesTrack } from 'utils/apiCalls/getSalesTrack';

function CustomerList() {
  const columns = [
    { id: 'labName', label: 'Lab Name', visible: true },
    { id: 'ownerName', label: 'Owner Name', visible: true },
    { id: 'mobile', label: 'Mobile', visible: true },
    { id: 'email', label: 'Email', visible: true },
    { id: 'address', label: 'Address', visible: true },
    { id: 'createddate', label: 'Date', visible: true },
    { id: 'SourceOfLead', label: 'Source of Lead', visible: true },
    { id: 'SourcePersonName', label: 'Source Person', visible: true },
    { id: 'versionId', label: 'Version', visible: true },
    { id: 'amount', label: 'Amount', visible: true },
    { id: 'SalesPerson', label: 'Sales Person', visible: true },
    { id: 'state', label: 'State', visible: true },
    { id: 'requirement', label: 'Detail Requirement', visible: true },
    { id: 'comment', label: 'Comment', visible: true },
    { id: 'followupdate', label: 'Follow-up Date', visible: true }
  ];

  const [selectedColumns, setSelectedColumns] = useState(() => columns.map((column) => ({ ...column, visible: true }))); // Initialize with all columns visible
  const [salesTrackData, setSalesTrackData] = useState([]);
  async function fetchCustomerList() {
    const temp = await getSalesTrack();

    setSalesTrackData(temp);
  }

  useEffect(() => {
    fetchCustomerList();
  }, []);
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h3">Customer List</Typography>
        <ColumnsList selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns} columns={columns} />
      </Box>

      <DummyDataTable selectedColumns={selectedColumns} salesTrackData={salesTrackData} />
    </Box>
  );
}

export default CustomerList;
