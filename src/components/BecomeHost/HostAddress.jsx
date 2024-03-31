import React, { useContext } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, styled, Grid } from '@mui/material';
import { HostContext } from '../../context/BecomeHostProvider';

const FormContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2)
}));

const initialValues = {
  address: '',
  country: '',
  state: '',
  city: '',
  zipcode: ''
};

const validationSchema = Yup.object().shape({
  address: Yup.string().required('Address is required'),
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  zipcode: Yup.number()
    .typeError('Zipcode must be a number')
    .required('Zipcode is required')
});

const HostAddress = ({goToNext}) => {
  const {setHostData} = useContext(HostContext)
  const handleSubmit = (values) => {
    const location = values
    setHostData((prev)=> {
      return {...prev, location}
    })
    goToNext();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors }) => (
        <FormContainer className='host-spacing'>
          <Typography variant="h6" gutterBottom>
            Host Address
          </Typography>
          <Form>
            <Grid container marginTop={1} spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="address"
                  label="Address"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.address)}
                  helperText={<ErrorMessage name="address" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="country"
                  label="Country"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.country)}
                  helperText={<ErrorMessage name="country" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="state"
                  label="State"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.state)}
                  helperText={<ErrorMessage name="state" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="city"
                  label="City"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.city)}
                  helperText={<ErrorMessage name="city" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name="zipcode"
                  label="Zipcode"
                  variant="outlined"
                  type="number"
                  fullWidth
                  error={Boolean(errors.zipcode)}
                  helperText={<ErrorMessage name="zipcode" />}
                />
              </Grid>
            </Grid>
            <Button type="submit" className='host-form-submit-buttons' variant="contained" color="primary">
              Next
            </Button>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default HostAddress;