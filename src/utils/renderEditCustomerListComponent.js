import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getSourceLeads } from './apiCalls/getSourceLeadsList';
import { getVersionList } from './apiCalls/getVersionList';
import { getSalesPersonList } from './apiCalls/getSalesPersonList';
import { getStateList } from './apiCalls/getStateList';

function RenderEditCustomerListComponent({ column, editData, handleEditDataChange, setEditData }) {
  const [sourceOfLeadOptions, setSourceOfLeadOptions] = useState([]);
  const [versionOptions, setVersionOptions] = useState([]);
  const [salesPersonOptions, setSalesPersonOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  async function fetchDropDOwnData() {
    const getSalesPersonListData = await getSalesPersonList();
    const getSourceLeadsListData = await getSourceLeads();
    // const getSourcePersonListData = await getSourcePerson();
    const getStateListData = await getStateList();
    const getVersionListData = await getVersionList();

    setSourceOfLeadOptions(getSourceLeadsListData);

    // setSourcePersonOptions(getSourcePersonListData);
    setVersionOptions(getVersionListData);
    setSalesPersonOptions(getSalesPersonListData);

    setStateOptions(getStateListData);
  }

  useEffect(() => {
    fetchDropDOwnData();
  }, []);

  const handleSourceIdChange = (event, newValue) => {
    setEditData((prevEditData) => ({
      ...prevEditData,
      [column.id]: newValue
    }));

    if (column.id === 'versionId') {
      setEditData((prevEditData) => ({
        ...prevEditData,
        projectedAmount: newValue.estimatedCost
      }));
    }
  };

  switch (column.id) {
    case 'labName':
    case 'ownerName':
    case 'mobile':
    case 'email':
    case 'address':
    case 'projectedAmount':
    case 'requirement':
    case 'comment':
      return (
        <TextField
          InputProps={{ shrink: true }}
          id={column.id}
          label={column.label}
          value={editData[column.id] || ''}
          onChange={(event) => handleEditDataChange(event, column.id)}
        />
      );

    case 'followupdate':
    case 'createddate':
      return (
        <TextField
          InputProps={{ shrink: true }}
          id={column.id}
          label={column.label}
          type="date"
          value={new Date(editData[column.id]).toISOString().split('T')[0] || ''}
          onChange={(event) => handleEditDataChange(event, column.id)}
        />
      );

    case 'sourceId':
      return (
        <Autocomplete
          value={editData.sourceId}
          onChange={handleSourceIdChange}
          id="controllable-states-demo"
          options={sourceOfLeadOptions}
          getOptionLabel={(option) => option.sourceName}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Controllable" />}
        />
      );
    case 'versionId':
      return (
        <Autocomplete
          value={editData.versionId}
          onChange={handleSourceIdChange}
          id="controllable-states-demo"
          options={versionOptions}
          getOptionLabel={(option) => option.vesionName}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Controllable" />}
        />
      );
    case 'salesPersonId':
      return (
        <Autocomplete
          value={editData.salesPersonId}
          onChange={handleSourceIdChange}
          id="controllable-states-demo"
          options={salesPersonOptions}
          getOptionLabel={(option) => option.salesPersonName}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Controllable" />}
        />
      );
    case 'stateId':
      return (
        <Autocomplete
          value={editData.stateId}
          onChange={handleSourceIdChange}
          id="controllable-states-demo"
          options={stateOptions}
          getOptionLabel={(option) => option.stateName}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Controllable" />}
        />
      );
    default:
      return null;
  }

  //   return (
  // <TextField
  //   InputProps={{ shrink: true }}
  //   id={column.id}
  //   label={column.label}
  //   value={editData[column.id] || ''}
  //   onChange={(event) => handleEditDataChange(event, column.id)}
  // />
  //   );
}

export default RenderEditCustomerListComponent;
