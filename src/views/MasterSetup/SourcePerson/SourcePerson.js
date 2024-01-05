import { Box } from '@mui/material';
import React from 'react';
import AddSourcePersonForm from './AddSourcePersonForm';
import useSourcePerson from './useSourcePerson';
import DisplaySalesPersonList from './DisplaySourcePersonList';

function SourcePerson() {
  const { handleSubmitAddSourcePersonForm } = useSourcePerson();
  return (
    <Box>
      <AddSourcePersonForm handleSubmitAddSourcePersonForm={handleSubmitAddSourcePersonForm} />
      <DisplaySalesPersonList />
    </Box>
  );
}

export default SourcePerson;
