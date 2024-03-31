
import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, styled, Grid } from '@mui/material';
import { HostContext } from '../../context/BecomeHostProvider';

const FormContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2)
}));

const initialValues = {
  guestCapacity: '',
  bedroom: '',
  bathroom: '',
  bed: '',
  aboutThisSpace: '',
  description: '',
  title: ''
};

const validationSchema = Yup.object().shape({
  guestCapacity: Yup.number()
    .typeError('Guest Capacity must be a number')
    .required('Guest Capacity is required'),
  bedroom: Yup.number()
    .typeError('Bedroom must be a number')
    .required('Bedroom is required'),
  bathroom: Yup.number()
    .typeError('Bathroom must be a number')
    .required('Bathroom is required'),
  bed: Yup.number()
    .typeError('Bed must be a number')
    .required('Bed is required'),
  aboutThisSpace: Yup.string()
    .min(200, 'About this space must have a minimum of 200 characters')
    .required('About this space is required'),
  description: Yup.string()
    .max(60, 'Description must not exceed 20 characters')
    .required('Description is required'),
  title: Yup.string()
    .required('Title is required')
});

const AboutHome = ({ goToNext }) => {
  const { setHostData } = useContext(HostContext);
  const handleSubmit = (values) => {
    setHostData((prev) => {
      return { ...prev, ...values };
    });
    goToNext();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors }) => (
        <FormContainer className="host-spacing">
          <Typography variant="h6" gutterBottom>
            About Home
          </Typography>
          <Form>
            <Grid container marginTop={1} spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.description)}
                  helperText={<ErrorMessage name="description" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.title)}
                  helperText={<ErrorMessage name="title" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="guestCapacity"
                  label="Guest Capacity"
                  variant="outlined"
                  type="number"
                  fullWidth
                  error={Boolean(errors.guestCapacity)}
                  helperText={<ErrorMessage name="guestCapacity" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="bedroom"
                  label="Bedroom"
                  variant="outlined"
                  type="number"
                  fullWidth
                  error={Boolean(errors.bedroom)}
                  helperText={<ErrorMessage name="bedroom" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="bathroom"
                  label="Bathroom"
                  variant="outlined"
                  type="number"
                  fullWidth
                  error={Boolean(errors.bathroom)}
                  helperText={<ErrorMessage name="bathroom" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="bed"
                  label="Bed"
                  variant="outlined"
                  type="number"
                  fullWidth
                  error={Boolean(errors.bed)}
                  helperText={<ErrorMessage name="bed" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="aboutThisSpace"
                  label="About this Space"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  error={Boolean(errors.aboutThisSpace)}
                  helperText={<ErrorMessage name="aboutThisSpace" />}
                />
              </Grid>
            </Grid>
            <Button type="submit" className="host-form-submit-buttons" variant="contained" color="primary">
              Next
            </Button>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default AboutHome;
