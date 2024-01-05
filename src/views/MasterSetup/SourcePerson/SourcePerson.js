import { Box } from '@mui/material';
import React from 'react';
import AddSourcePersonForm from './AddSourcePersonForm';
import useSourcePerson from './useSourcePerson';
import DisplaySalesPersonList from './DisplaySourcePersonList';
import { getSourcePerson } from 'utils/apiCalls/getSourcePersonList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { getSourceLeads } from 'utils/apiCalls/getSourceLeadsList';

function SourcePerson() {
  const navigate = useNavigate();
  const { handleSubmitAddSourcePersonForm } = useSourcePerson();
  const [sourceOfLeadOptions, setSourceOfLeadOptions] = useState([]);
  const [tableDataForSourcePerson, setTableDataForSourcePerson] = useState([]);

  async function fetchDropDOwnData() {
    const getSourceLeadsListData = await getSourceLeads();
    setSourceOfLeadOptions(getSourceLeadsListData);
    console.log('getSourcePersonListData', getSourceLeadsListData);
  }

  useEffect(() => {
    if (!sessionStorage.getItem('apikey')) {
      navigate('/signin');
    } else {
      fetchDropDOwnData();
      getTableData();
    }
  }, []);
  async function getTableData() {
    const tableData = await getSourcePerson();
    setTableDataForSourcePerson(tableData);
    console.log('tableData', tableData);
  }

  return (
    <Box>
      <AddSourcePersonForm handleSubmitAddSourcePersonForm={handleSubmitAddSourcePersonForm} sourceOfLeadOptions={sourceOfLeadOptions} />
      <DisplaySalesPersonList tableDataForSourcePerson={tableDataForSourcePerson} />
    </Box>
  );
}

export default SourcePerson;
