import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Grid, Box } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DatePicker from '@mui/lab/DatePicker';
import FileUpload from './FileUpload';
import { useState } from 'react';
import { getSalesPersonList } from 'utils/apiCalls/getSalesPersonList';
import { getSourceLeads } from 'utils/apiCalls/getSourceLeadsList';
import { getSourcePerson } from 'utils/apiCalls/getSourcePersonList';
import { getStateList } from 'utils/apiCalls/getStateList';
import { getVersionList } from 'utils/apiCalls/getVersionList';
import { useEffect } from 'react';
import createSalesTrack from 'utils/apiCalls/createSalesTrack';
const MyForm = () => {
  const formik = useFormik({
    initialValues: {
      labName: '',
      ownerName: '',
      mobile: '',
      email: '',
      address: '',
      date: new Date().toISOString().split('T')[0],
      sourceOfLead: '',
      sourcePersonName: '',
      version: '',
      amount: '',
      salesPerson: '',
      state: 'NewLead State',
      detailRequirement: '',
      comment: '',
      followupDate: new Date().toISOString().split('T')[0],
      downloadPredefinedFile: false,
      attachment: null
    },
    onSubmit: (values) => {
      createSalesTrack(values).then(() => {
        // handleReset();
      });
    }
  });

  const [sourceOfLeadOptions, setSourceOfLeadOptions] = useState([]);
  const [sourcePersonOptions, setSourcePersonOptions] = useState([]);
  const [versionOptions, setVersionOptions] = useState([]);
  const [salesPersonOptions, setSalesPersonOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);

  const handleReset = () => {
    formik.resetForm();
    formik.setFieldValue('date', new Date().toISOString().split('T')[0]);
    formik.setFieldValue('followupDate', new Date().toISOString().split('T')[0]);
  };
  const handleFileUpload = (files) => {
    // Handle the uploaded files here
    console.log('Uploaded files:', files);
  };
  function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
    const randomNum = Math.random().toString(36).substr(2, 5); // Generate a random number

    return timestamp + randomNum;
  }
  const [uniqueId] = useState(generateUniqueId());

  async function fetchDropDOwnData() {
    const getSalesPersonListData = await getSalesPersonList();
    const getSourceLeadsListData = await getSourceLeads();
    const getSourcePersonListData = await getSourcePerson();
    const getStateListData = await getStateList();
    const getVersionListData = await getVersionList();

    setSourceOfLeadOptions(getSourceLeadsListData);

    setSourcePersonOptions(getSourcePersonListData);
    setVersionOptions(getVersionListData);
    setSalesPersonOptions(getSalesPersonListData);

    setStateOptions(getStateListData);
  }

  useEffect(() => {
    fetchDropDOwnData();
  }, []);

  return (
    <Box>
      {/* <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained">New DB ID - {uniqueId} </Button>
        <Button component="label" variant="contained" startIcon={<CloudDownloadIcon />}>
          Download file
        </Button>
      </Box> */}
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <TextField fullWidth label="Lab Name" name="labName" value={formik.values.labName} onChange={formik.handleChange} />
            <TextField fullWidth label="Owner Name" name="ownerName" value={formik.values.ownerName} onChange={formik.handleChange} />
            <TextField fullWidth label="Mobile" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} />
            <TextField
              InputLabelProps={{
                shrink: true
              }}
              name="date"
              label="Date"
              defaultValue={new Date().toISOString().split('T')[0]} // Set y
              sx={{ width: '100%' }}
              type="date"
              value={formik.values.date}
              onChange={(value) => formik.setFieldValue('date', value.target.value)}
            />{' '}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <TextField fullWidth label="Email" name="email" value={formik.values.email} onChange={formik.handleChange} />
            <TextField fullWidth label="Address" name="address" value={formik.values.address} onChange={formik.handleChange} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Source of Lead</InputLabel>
              <Select label="Source of Lead" name="sourceOfLead" value={formik.values.sourceOfLead} onChange={formik.handleChange}>
                {sourceOfLeadOptions.map((option) => {
                  return (
                    <MenuItem key={option.sid} value={option}>
                      {option.sourceName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Source Person Name</InputLabel>
              <Select
                label="Source Person Name"
                name="sourcePersonName"
                value={formik.values.sourcePersonName}
                onChange={formik.handleChange}
              >
                {sourcePersonOptions.map((option) => {
                  return (
                    <MenuItem key={option.spid} value={option}>
                      {option.sourcePersonName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Version</InputLabel>
              <Select
                label="Version"
                name="version"
                value={formik.values.version}
                onChange={(value) => {
                  console.log('valueeeee', value.target.value);
                  formik.handleChange(value);
                  // const selectedVersion = versionOptions.find((opt) => opt === value.target.value);
                  formik.setFieldValue('amount', value.target.value.estimatedCost ? value.target.value.estimatedCost : '');
                }}
              >
                {versionOptions.map((option) => {
                  return (
                    <MenuItem key={option.vid} value={option}>
                      {option.vesionName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField fullWidth label="Amount" name="amount" value={formik.values.amount} onChange={formik.handleChange} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Sales Person</InputLabel>
              <Select label="Sales Person" name="salesPerson" value={formik.values.salesPerson} onChange={formik.handleChange}>
                {salesPersonOptions.map((option) => {
                  return (
                    <MenuItem key={option.sid} value={option}>
                      {option.salesPersonName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select label="State" name="state" value={formik.values.state} onChange={formik.handleChange}>
                {stateOptions.map((option) => {
                  console.log('option', option);
                  return (
                    <MenuItem key={option.stid} value={option}>
                      {option.stateName}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Detail Requirement"
              name="detailRequirement"
              value={formik.values.detailRequirement}
              onChange={formik.handleChange}
              rows={4}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box sx={{ width: '60%' }}>
              <TextField
                fullWidth
                label="Comment"
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
                multiline
                rows={7}
              />{' '}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '40%' }}>
              <TextField
                InputLabelProps={{
                  shrink: true
                }}
                size="small"
                defaultValue={new Date().toISOString().split('T')[0]}
                label="Followup Date"
                name="followupDate"
                value={formik.values.followupDate}
                onChange={(value) => formik.setFieldValue('followupDate', value.target.value)}
                sx={{ width: '100%' }}
                type="date"
              />{' '}
              <FileUpload onFileUpload={handleFileUpload} />{' '}
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 10, display: 'flex', gap: 2, justifyContent: 'center' }}>
          {' '}
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>{' '}
          <Button type="button" variant="contained" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Box>{' '}
      </form>
    </Box>
  );
};

export default MyForm;
