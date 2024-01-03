import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Grid, Box, FormHelperText } from '@mui/material';
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
import * as Yup from 'yup';
import createSalesTrack from 'utils/apiCalls/createSalesTrack';
import { useNavigate } from 'react-router';
const MyForm = () => {
  const validationSchema = Yup.object({
    labName: Yup.string().required('Lab Name is required'),
    ownerName: Yup.string().required('Owner Name is required'),
    mobile: Yup.string().required('Mobile is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    address: Yup.string().required('Address is required'),
    date: Yup.date().required('Date is required'),
    sourceOfLead: Yup.object().required('Source of Lead is required'),
    sourcePersonName: Yup.object().required('Source Person Name is required'),
    version: Yup.object().required('Version is required'),
    amount: Yup.number().positive('Amount must be a positive number').required('Amount is required'),
    salesPerson: Yup.object().required('Sales Person is required'),
    state: Yup.object().required('State is required'),
    detailRequirement: Yup.string().required('Detail Requirement is required'),
    comment: Yup.string().required('Comment is required'),
    followupDate: Yup.date().required('Followup Date is required')
  });
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
      state: '',
      detailRequirement: '',
      comment: '',
      followupDate: new Date().toISOString().split('T')[0],
      downloadPredefinedFile: false,
      attachment: null
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createSalesTrack(values).then(() => {
        handleReset();
      });
    }
  });

  const [sourceOfLeadOptions, setSourceOfLeadOptions] = useState([]);
  const [sourcePersonOptions, setSourcePersonOptions] = useState([]);
  const [versionOptions, setVersionOptions] = useState([]);
  const [salesPersonOptions, setSalesPersonOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const navigate = useNavigate();
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
    if (!sessionStorage.getItem('apikey')) {
      navigate('/signin');
    } else fetchDropDOwnData();
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
            <TextField
              error={formik.touched.labName && Boolean(formik.errors.labName)}
              helperText={formik.touched.labName && formik.errors.labName}
              fullWidth
              label="Lab Name"
              name="labName"
              value={formik.values.labName}
              onChange={formik.handleChange}
            />
            <TextField
              error={formik.touched.ownerName && Boolean(formik.errors.ownerName)}
              helperText={formik.touched.ownerName && formik.errors.ownerName}
              fullWidth
              label="Owner Name"
              name="ownerName"
              value={formik.values.ownerName}
              onChange={formik.handleChange}
            />
            <TextField
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
              fullWidth
              label="Mobile"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
            />
            <TextField
              InputLabelProps={{
                shrink: true
              }}
              name="date"
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              label="Date"
              defaultValue={new Date().toISOString().split('T')[0]} // Set y
              sx={{ width: '100%' }}
              type="date"
              value={formik.values.date}
              onChange={(value) => formik.setFieldValue('date', value.target.value)}
            />{' '}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <TextField
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <TextField
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              fullWidth
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <FormControl fullWidth error={formik.touched.sourceOfLead && Boolean(formik.errors.sourceOfLead)}>
              <InputLabel>Source of Lead</InputLabel>
              <Select label="Source of Lead" name="sourceOfLead" value={formik.values.sourceOfLead} onChange={formik.handleChange}>
                {sourceOfLeadOptions.map((option) => (
                  <MenuItem key={option.sid} value={option}>
                    {option.sourceName}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.sourceOfLead && formik.errors.sourceOfLead && <FormHelperText>{formik.errors.sourceOfLead}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={formik.touched.sourcePersonName && Boolean(formik.errors.sourcePersonName)}>
              <InputLabel>Source Person Name</InputLabel>
              <Select
                label="Source Person Name"
                name="sourcePersonName"
                value={formik.values.sourcePersonName}
                onChange={formik.handleChange}
              >
                {sourcePersonOptions.map((option) => (
                  <MenuItem key={option.spid} value={option}>
                    {option.sourcePersonName}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.sourcePersonName && formik.errors.sourcePersonName && (
                <FormHelperText>{formik.errors.sourcePersonName}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={formik.touched.version && Boolean(formik.errors.version)}>
              <InputLabel>Version</InputLabel>
              <Select
                label="Version"
                name="version"
                value={formik.values.version}
                onChange={(value) => {
                  formik.handleChange(value);
                  formik.setFieldValue('amount', value.target.value.estimatedCost ? value.target.value.estimatedCost : '');
                }}
              >
                {versionOptions.map((option) => (
                  <MenuItem key={option.vid} value={option}>
                    {option.vesionName}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.version && formik.errors.version && <FormHelperText>{formik.errors.version}</FormHelperText>}
            </FormControl>

            <TextField
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              fullWidth
              label="Amount"
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <FormControl fullWidth error={formik.touched.salesPerson && Boolean(formik.errors.salesPerson)}>
              <InputLabel>Sales Person</InputLabel>
              <Select label="Sales Person" name="salesPerson" value={formik.values.salesPerson} onChange={formik.handleChange}>
                {salesPersonOptions.map((option) => (
                  <MenuItem key={option.sid} value={option}>
                    {option.salesPersonName}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.salesPerson && formik.errors.salesPerson && <FormHelperText>{formik.errors.salesPerson}</FormHelperText>}
            </FormControl>

            <FormControl fullWidth error={formik.touched.state && Boolean(formik.errors.state)}>
              <InputLabel>State</InputLabel>
              <Select label="State" name="state" value={formik.values.state} onChange={formik.handleChange}>
                {stateOptions.map((option) => (
                  <MenuItem key={option.stid} value={option}>
                    {option.stateName}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.state && formik.errors.state && <FormHelperText>{formik.errors.state}</FormHelperText>}
            </FormControl>

            <TextField
              error={formik.touched.detailRequirement && Boolean(formik.errors.detailRequirement)}
              helperText={formik.touched.detailRequirement && formik.errors.detailRequirement}
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
                error={formik.touched.comment && Boolean(formik.errors.comment)}
                helperText={formik.touched.comment && formik.errors.comment}
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
                error={formik.touched.followupDate && Boolean(formik.errors.followupDate)}
                helperText={formik.touched.followupDate && formik.errors.followupDate}
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
          <Button type="submit" variant="contained" color="secondary">
            Save
          </Button>{' '}
          <Button type="button" variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </Button>
        </Box>{' '}
      </form>
    </Box>
  );
};

export default MyForm;
