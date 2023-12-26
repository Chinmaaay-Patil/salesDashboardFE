import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Grid, Box } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DatePicker from '@mui/lab/DatePicker';
import FileUpload from './FileUpload';
import { useState } from 'react';
const MyForm = () => {
  const formik = useFormik({
    initialValues: {
      labName: '',
      ownerName: '',
      mobile: '',
      email: '',
      address: '',
      date: null,
      sourceOfLead: '',
      sourcePersonName: '',
      version: '',
      amount: '',
      salesPerson: '',
      state: 'NewLead State',
      detailRequirement: '',
      comment: '',
      followupDate: null,
      downloadPredefinedFile: false,
      attachment: null
    },
    onSubmit: (values) => {
      console.log(values);
      // Add logic for form submission
    }
  });

  const sourceOfLeadOptions = ['Option 1', 'Option 2', 'Option 3'];
  const sourcePersonOptions = ['Person 1', 'Person 2', 'Person 3'];
  const versionOptions = ['Version 1', 'Version 2', 'Version 3'];
  const salesPersonOptions = ['Sales Person 1', 'Sales Person 2', 'Sales Person 3'];
  const stateOptions = ['State 1', 'State 2', 'State 3'];

  const handleReset = () => {
    formik.resetForm();
    formik.setFieldValue('date', new Date().toISOString().split('T')[0]);
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
  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained">New DB ID - {uniqueId} </Button>
        <Button component="label" variant="contained" startIcon={<CloudDownloadIcon />}>
          Download file
        </Button>
      </Box>
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
                {sourceOfLeadOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
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
                {sourcePersonOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Version</InputLabel>
              <Select
                label="Version"
                name="version"
                value={formik.values.version}
                onChange={(value) => {
                  formik.handleChange(value);
                  const selectedVersion = versionOptions.find((opt) => opt === value.target.value);
                  formik.setFieldValue('amount', selectedVersion ? '100' : '');
                }}
              >
                {versionOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField fullWidth label="Amount" name="amount" value={formik.values.amount} onChange={formik.handleChange} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Sales Person</InputLabel>
              <Select label="Sales Person" name="salesPerson" value={formik.values.salesPerson} onChange={formik.handleChange}>
                {salesPersonOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select label="State" name="state" value={formik.values.state} onChange={formik.handleChange}>
                {stateOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
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
