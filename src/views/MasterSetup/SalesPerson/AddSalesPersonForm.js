// AddSalesPersonForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from 'store/constant';

const AddSalesPersonForm = ({ handleSubmitAddSalesPersonForm }) => {
  const formik = useFormik({
    initialValues: {
      salesPersonName: '',
      designation: '',
      mobile: '',
      email: ''
    },
    validationSchema: Yup.object({
      salesPersonName: Yup.string().required('Name is required'),
      designation: Yup.string().required('Designation is required'),
      mobile: Yup.string().required('Mobile is required'),
      email: Yup.string().email('Invalid email address').required('Email is required')
    }),
    onSubmit: (values) => {
      handleSubmitAddSalesPersonForm(values);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <Typography sx={{ flex: '1 1 100%' }} variant="h2" id="tableTitle" component="div">
        Add Sales Person
      </Typography>
      <Grid container spacing={gridSpacing} sx={{ mt: 1 }}>
        <Grid item lg={2} md={3} sm={6} xs={12}>
          <TextField
            id="salesPersonName"
            name="salesPersonName"
            label="Sales Person Name"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.salesPersonName}
            error={formik.touched.salesPersonName && Boolean(formik.errors.salesPersonName)}
            helperText={formik.touched.salesPersonName && formik.errors.salesPersonName}
          />
        </Grid>
        <Grid item lg={2} md={3} sm={6} xs={12}>
          <TextField
            id="designation"
            name="designation"
            label="Designation"
            variant="outlined"
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.designation}
            error={formik.touched.designation && Boolean(formik.errors.designation)}
            helperText={formik.touched.designation && formik.errors.designation}
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
        <Grid item lg={2} md={3} sm={6} xs={12}>
          <Button type="submit" variant="contained" color="primary" sx={{ width: '100%', mt: 0.5 }}>
            Submit
          </Button>
        </Grid>
        <Grid item lg={2} md={3} sm={6} xs={12}>
          <Button type="reset" variant="contained" color="secondary" sx={{ width: '100%', mt: 0.5 }}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddSalesPersonForm;
