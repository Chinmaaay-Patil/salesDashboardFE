import React from 'react';
import AddSalesPersonForm from './AddSalesPersonForm';
import useSalesPerson from './useSalesPerson';
import DisplaySalesPersonList from './DisplaySalesPersonList';
import { Box } from '@mui/material';

function SalesPerson() {
  const { handleSubmitAddSalesPersonForm } = useSalesPerson();
  return (
    <Box>
      <AddSalesPersonForm handleSubmitAddSalesPersonForm={handleSubmitAddSalesPersonForm} />
      <DisplaySalesPersonList />
    </Box>
  );
}

export default SalesPerson;
