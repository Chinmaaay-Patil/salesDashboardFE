import React from 'react';
import DummyDataTable from './CustomerDataListTable';
import { Box, Typography, useMediaQuery } from '@mui/material';
import ColumnsList from './ColumnsList';
import { useState } from 'react';
import { useEffect } from 'react';
import { getSalesTrack } from 'utils/apiCalls/getSalesTrack';
import { getTodayDate } from 'utils/getTodaysDate';
import { useNavigate } from 'react-router';

function CustomerList() {
  const columns = [
    { id: 'labName', label: 'Lab Name', visible: true },
    { id: 'ownerName', label: 'Owner Name', visible: true },
    { id: 'mobile', label: 'Mobile', visible: true },
    { id: 'email', label: 'Email', visible: true },
    { id: 'address', label: 'Address', visible: true },
    { id: 'createddate', label: 'Date', visible: true },
    { id: 'sourceId', label: 'Source of Lead', visible: true },
    // { id: 'SourcePersonName', label: 'Source Person', visible: true },
    { id: 'versionId', label: 'Version', visible: true },
    { id: 'projectedAmount', label: 'Amount', visible: true },
    { id: 'salesPersonId', label: 'Sales Person', visible: true },
    { id: 'stateId', label: 'State', visible: true },
    { id: 'requirement', label: 'Detail Requirement', visible: true },
    { id: 'comment', label: 'Comment', visible: true },
    { id: 'followupdate', label: 'Follow-up Date', visible: true }
  ];

  const [selectedColumns, setSelectedColumns] = useState(() => columns.map((column) => ({ ...column, visible: true }))); // Initialize with all columns visible
  const [salesTrackData, setSalesTrackData] = useState([]);
  const [selected, setSelected] = React.useState([]);

  const navigate = useNavigate();
  const [salesDashboardDataDates, setSalesDashboardDataDates] = useState({
    fromDate: getTodayDate(),
    toDate: getTodayDate()
  });

  async function fetchCustomerList() {
    const temp = await getSalesTrack(salesDashboardDataDates);

    setSalesTrackData(temp);
  }

  async function handleFilterOptionsChange() {
    const temp = await getSalesTrack(salesDashboardDataDates);
    setSalesTrackData(temp);
  }

  useEffect(() => {
    if (!sessionStorage.getItem('apikey')) {
      navigate('/signin');
    } else fetchCustomerList();
  }, []);

  const isMobile = useMediaQuery('(max-width: 600px)');
  const [editData, setEditData] = useState({});

  function handleEditOneRowData() {
    if (selected.length === 1) {
      const temp = salesTrackData.find((track) => {
        return track.id === selected[0];
      });

      setEditData(temp);
    } else {
      setEditData({});
    }
  }

  function handleSaveOneRowData() {
    console.log('editData save', editData);
    setEditData({});
  }
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : 'left'
        }}
      >
        <Typography variant="h3">Customer List</Typography>
        <ColumnsList
          selectedColumns={selectedColumns}
          setSelectedColumns={setSelectedColumns}
          columns={columns}
          salesDashboardDataDates={salesDashboardDataDates}
          setSalesDashboardDataDates={setSalesDashboardDataDates}
          handleFilterOptionsChange={handleFilterOptionsChange}
          selected={selected}
          setSelected={setSelected}
          salesTrackData={salesTrackData}
          handleEditOneRowData={handleEditOneRowData}
          editData={editData}
          handleSaveOneRowData={handleSaveOneRowData}
        />
      </Box>

      <DummyDataTable
        selectedColumns={selectedColumns}
        salesTrackData={salesTrackData}
        selected={selected}
        setSelected={setSelected}
        editData={editData}
        setEditData={setEditData}
      />
    </Box>
  );
}

export default CustomerList;
