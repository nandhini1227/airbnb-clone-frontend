import React, { useContext,  useEffect,  useRef, useState } from 'react';
import { Formik, Form, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Grid,
  Button,
  IconButton,
  Avatar,
  Typography,
  styled
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { HostContext } from '../../context/BecomeHostProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { showNotification } from '../../assets/alerts/sweetAlert';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AuthContext from '../../context/AuthProvider';
import SpinLoader from '../../assets/spinner/spinner';

const FormContainer = Box;

const initialValues = {
  images: []
};

const validationSchema = Yup.object().shape({
  images: Yup.array().required('Images are required').min(1, 'At least one image is required')
});

const HomeImages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const {hostData, setHostData} = useContext(HostContext)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]);
  const {auth} = useContext(AuthContext);

  const handleSubmit = async (values) => {
    const {images} = values
    const formData = await handleImageUpload(images);
    setIsLoading(true);
    const binaryImages = await uploadImages(formData);
    const userId = auth.data.userId;
    setHostData((prev) => {return { ...prev, images: binaryImages, userId }});
    setFormSubmitted(true); 
    };

    const uploadImages = async (data) => {
      try {
        const response = await axiosPrivate.post('/upload', data, {headers: { 'Content-Type': 'multipart/form-data'}});
        return response.data.data;
      } catch (error) {
        setIsLoading(false);
        showNotification(error.response.data.status, error.response.data.message)
        console.error(error);
      }
    }

    useEffect(()=> {
      if(formSubmitted){
        setFormSubmitted(false);
        createHost(hostData);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hostData])

    const createHost = async (data) => {
      try {
        const response = await axiosPrivate.post('/', data);
        if(response.data) {
          showNotification(response.data.status, response.data.message);
          navigate('/dashboard')
        }
      } catch (err) {
        showNotification(err.response.data.status, err.response.data.message)
        console.error(err);
        navigate('/login', {state:{from: location}, replace: true})
      }
    }


  const handleFileUpload = (event, setFieldValue, values) => {
    const files = Array.from(event.currentTarget.files);
    setFieldValue('images', [...values.images, ...files]);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...imagePreviews]);
  };

  const handleRemoveImage = (index, setFieldValue, values) => {
    const newImages = [...values.images];
    newImages.splice(index, 1);
    setFieldValue('images', newImages);
    const newPreviews = [...previewImages];
    newPreviews.splice(index, 1);
    setPreviewImages(newPreviews);
  };

  const handleImageUpload = async (values) => {
    const formData = new FormData();
    values.forEach((image) => {formData.append(`images`, image)});
    return formData;
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const ImagePreview = styled(Avatar)(({ theme }) => ({
    width: '7rem',
    height: '7rem',
    marginBottom: '1rem',
    borderRadius: '50%',
    marginRight: '1rem'
  }));

  return (
    <>
      { !isLoading?
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue }) => (
            <FormContainer className='host-profile'>
              <Typography variant="h6" gutterBottom>
                Home Images
              </Typography>
              <Form>
                <FieldArray name="images">
                  {({ push, remove }) => (
                    <>
                      <Grid container spacing={2}>
                        {values.images.map((_, index) => (
                          <Grid item key={index}>
                            <ImagePreview src={previewImages[index]} alt={`Uploaded Image ${index + 1}`} />
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleRemoveImage(index, setFieldValue, values)}
                            >
                              X Remove
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                      <Grid item xs={12}>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(event) => handleFileUpload(event, setFieldValue, values)}
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                        />
                        <Button sx={{marginTop:'2rem'}} variant="contained" color="primary" onClick={handleUploadClick}>
                          <IconButton
                            component="span"
                            style={{ color: '#ffffff' }}
                            aria-label="Upload Image"
                            title="Upload Image"
                          >
                            <CloudUploadIcon sx={{ fontSize: '.9rem' }} />
                          </IconButton>
                          Upload
                        </Button>
                        {touched.images && errors.images && (
                          <ErrorMessage component="div" name="images" className="error-message" />
                        )}
                      </Grid>
                    </>
                  )}
                </FieldArray>
                <Button type="submit" variant="contained" color="primary" className="host-form-submit-buttons">
                  Submit
                </Button>
              </Form>
            </FormContainer>
          )}
        </Formik>:
        <SpinLoader/>}
    </>  
  );
};

export default HomeImages;