import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Grid, Box } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DatePicker from '@mui/lab/DatePicker';
import FileUpload from './FileUpload';
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <TextField fullWidth label="Lab Name" name="labName" value={formik.values.labName} onChange={formik.handleChange} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField fullWidth label="Owner Name" name="ownerName" value={formik.values.ownerName} onChange={formik.handleChange} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField fullWidth label="Mobile" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField fullWidth label="Email" name="email" value={formik.values.email} onChange={formik.handleChange} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField fullWidth label="Address" name="address" value={formik.values.address} onChange={formik.handleChange} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
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
          />
          {/* <DatePicker
            fullWidth
            label="Date"
            name="date"
            value={formik.values.date}
            onChange={(value) => formik.setFieldValue('date', value)}
            renderInput={(params) => <TextField {...params} />}
          /> */}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
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
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
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
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
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
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField fullWidth label="Amount" name="amount" value={formik.values.amount} onChange={formik.handleChange} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
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
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
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
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            fullWidth
            label="Detail Requirement"
            name="detailRequirement"
            value={formik.values.detailRequirement}
            onChange={formik.handleChange}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TextField
            fullWidth
            label="Comment"
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {' '}
          <TextField
            InputLabelProps={{
              shrink: true
            }}
            defaultValue={new Date().toISOString().split('T')[0]}
            label="Followup Date"
            name="followupDate"
            value={formik.values.followupDate}
            onChange={(value) => formik.setFieldValue('followupDate', value.target.value)}
            sx={{ width: '100%' }}
            type="date"
          />
          {/* <DatePicker
            fullWidth
            label="Followup Date"
            name="followupDate"
            value={formik.values.followupDate}
            onChange={(value) => formik.setFieldValue('followupDate', value)}
            renderInput={(params) => <TextField {...params} />}
          /> */}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Button component="label" variant="contained" startIcon={<CloudDownloadIcon />}>
            Download file
          </Button>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          {/* <input
            type="file"
            accept=".doc, .docx"
            onChange={(event) => {
              formik.setFieldValue('attachment', event.currentTarget.files[0]);
            }}
          /> */}
          <FileUpload onFileUpload={handleFileUpload} />
        </Grid>
      </Grid>
      <Box sx={{ border: '1px solid red', mt: 15 }}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>{' '}
        <Button type="button" variant="contained" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </form>
  );
};

export default MyForm;
