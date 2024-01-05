import React from 'react';
import AddSalesPersonForm from './AddSalesPersonForm';
import useSalesPerson from './useSalesPerson';
import DisplaySalesPersonList from './DisplaySalesPersonList';
import { Box } from '@mui/material';
import { getSalesPersonList } from 'utils/apiCalls/getSalesPersonList';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function SalesPerson() {
  const navigate = useNavigate();
  const { handleSubmitAddSalesPersonForm } = useSalesPerson();
  const [tableDataForSalesPerson, setTableDataForSalesPerson] = useState([]);

  useEffect(() => {
    if (!sessionStorage.getItem('apikey')) {
      navigate('/signin');
    } else {
      getTableData();
    }
  }, []);
  async function getTableData() {
    const tableData = await getSalesPersonList();
    setTableDataForSalesPerson(tableData);
  }
  return (
    <Box>
      <AddSalesPersonForm handleSubmitAddSalesPersonForm={handleSubmitAddSalesPersonForm} getTableData={getTableData} />
      <DisplaySalesPersonList tableDataForSalesPerson={tableDataForSalesPerson} />
    </Box>
  );
}

export default SalesPerson;
