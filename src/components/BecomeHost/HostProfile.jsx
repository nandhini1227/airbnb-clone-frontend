import React, { useContext, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Grid,
  Button,
  TextField,
  IconButton,
  Avatar,
  Typography
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { HostContext } from '../../context/BecomeHostProvider';
const FormContainer = Box;

const initialValues = {
  name: '',
  image: null,
  aboutHost: ''
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  image: Yup.mixed().required('Image is required'),
  aboutHost: Yup.string().required('About Host is required').min(150, 'Minimum 150 characters')
});

const HostProfileForm = ({goToNext}) => {
  const {setHostData} = useContext(HostContext)
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = async (values) => {
    const image =await handleImageUpload(values.image)
    const host = {
      name: values.name,
      profile: image,
      about: values.aboutHost
    }
    setHostData((prev)=> {
      return ({...prev, host})
    })
    goToNext();
  };

  const handleImageUpload = (value) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(value);
  
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1];
        const imageObjects = { name: value.name, data: base64String };
        resolve(imageObjects);
      };
    });
  };
  


  const handleFileUpload = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue('image', file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleRemoveImage = (setFieldValue) => {
    setFieldValue('image', null);
    setPreviewImage(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, errors, touched, setFieldValue }) => (
        <FormContainer className='host-profile'>
          <Typography variant="h6" gutterBottom>
            Host Profile
          </Typography>
          <Form >
            <Grid container spacing={2} marginTop={1}>
              {values.image && (
                <Grid item xs={12}>
                  <Avatar
                    src={previewImage}
                    alt="Uploaded Image"
                    style={{ width: '7rem', height: '7rem', marginBottom: '1rem' }}
                  />
                  <Button variant="contained" color="secondary" onClick={() => handleRemoveImage(setFieldValue)}>
                    X Remove
                  </Button>
                </Grid>
              )}
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleFileUpload(event, setFieldValue)}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <Button variant="contained" color="primary" onClick={handleUploadClick}>
                  <IconButton component="span" style={{ color: '#ffffff' }} aria-label="Upload Image" title="Upload Image">
                    <CloudUploadIcon sx={{ fontSize: '.9rem' }} />
                  </IconButton>
                  Upload Image
                </Button>
                {touched.image && errors.image && (
                  <ErrorMessage component="div" name="image" className="error-message" />
                )}
              </Grid>

              <Grid item xs={12}>
                <Field
                  type="text"
                  name="name"
                  as={TextField}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && <ErrorMessage name="name" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  type="text"
                  name="aboutHost"
                  as={TextField}
                  label="About Host"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  error={touched.aboutHost && Boolean(errors.aboutHost)}
                  helperText={touched.aboutHost && <ErrorMessage name="aboutHost" />}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" color="primary" className="host-form-submit-buttons">
              Next
            </Button>
          </Form>
        </FormContainer>
      )}
    </Formik>
  );
};

export default HostProfileForm;