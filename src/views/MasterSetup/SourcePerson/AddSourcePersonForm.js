// AddSalesPersonForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';

const AddSourcePersonForm = ({ handleSubmitAddSourcePersonForm, sourceOfLeadOptions, getTableData }) => {
  const formik = useFormik({
    initialValues: {
      sourcePersonName: '',
      companyName: '',
      mobile: '',
      email: ''
    },
    validationSchema: Yup.object({
      sourcePersonName: Yup.string().required('Name is required'),
      companyName: Yup.string().required('Company Name is required'),
      mobile: Yup.string().required('Mobile is required'),
      email: Yup.string().email('Invalid email address').required('Email is required')
      // sourceOfLead: Yup.object().required('Source of Lead is required')
    }),
    onSubmit: async (values) => {
      const response = await handleSubmitAddSourcePersonForm(values);

      if (response.spid) {
        getTableData();
        formik.handleReset();
      }
      console.log('responseresponse', response);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <Typography sx={{ flex: '1 1 100%' }} variant="h2" id="tableTitle" component="div">
        Add Source Person
      </Typography>
      <Grid container spacing={gridSpacing} sx={{ mt: 1 }}>
        <Grid item lg={2} md={3} sm={6} xs={12}>
          <TextField
            id="sourcePersonName"
            name="sourcePersonName"
            label="Source Person Name"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.sourcePersonName}
            error={formik.touched.sourcePersonName && Boolean(formik.errors.sourcePersonName)}
            helperText={formik.touched.sourcePersonName && formik.errors.sourcePersonName}
          />
        </Grid>
        <Grid item lg={2} md={3} sm={6} xs={12}>
          <TextField
            id="companyName"
            name="companyName"
            label="Company Name"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.companyName}
            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
            helperText={formik.touched.companyName && formik.errors.companyName}
          />
        </Grid>
        <Grid item lg={2} md={3} sm={6} xs={12}>
          <TextField
            id="mobile"
            name="mobile"
            label="Mobile"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
        </Grid>
        <Grid item lg={2} md={3} sm={6} xs={12}>
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        {/* <Grid item lg={2} md={3} sm={6} xs={12}>
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
        </Grid> */}
        <Grid item lg={2} md={3} sm={6} xs={12}>
          <Button type="submit" variant="contained" color="secondary" sx={{ width: '100%', mt: 0.5 }}>
            Submit
          </Button>
        </Grid>
        <Grid item lg={2} md={3} sm={6} xs={12}>
          <Button type="reset" variant="contained" color="primary" sx={{ width: '100%', mt: 0.5 }}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddSourcePersonForm;
