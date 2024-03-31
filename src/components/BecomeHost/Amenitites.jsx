import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  styled
} from '@mui/material';
import { HostContext } from '../../context/BecomeHostProvider';

const FormContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2)
}));

const AddButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0)
}));

const TitleBox = styled(Paper)(({ theme }) => ({
  display: 'inline-block',
  width: '15rem',
  padding: '1rem',
  backgroundColor: '#f7f7f7',
  margin: theme.spacing(0.5),
  position: 'relative',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
}));

const TitleText = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  color: theme.palette.text.secondary
}));

const RemoveButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  right: theme.spacing(1),
  transform: 'translateY(-50%)',
  color: '#fff',
  border: 'none',
  padding: '.4rem',
  backgroundColor: 'var(--theme)',
  '&:hover': {
    backgroundColor: '#000'
  }
}));

const initialValues = {
  amenities: ''
};

const validationSchema = Yup.object().shape({
  amenities: Yup.string().required('Amenities are required')
});

const Amenities = ({goToNext}) => {
  const {setHostData} = useContext(HostContext)
  const [submittedAmenities, setSubmittedAmenities] = useState([]);

  const handleNextForm = () => {
    setHostData((prev)=> {
      return ({...prev, amenities:submittedAmenities})
    })
    goToNext()
  }


  const handleSubmit = async (values, { resetForm }) => {
    setSubmittedAmenities(prev => {
     return [...prev, values.amenities]
    });
    resetForm()
  };

  const handleRemoveAmenities = (index) => {
    const updatedAmenities = [...submittedAmenities];
    updatedAmenities.splice(index, 1);
    setSubmittedAmenities(updatedAmenities);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, handleChange, errors }) => (
        <FormContainer className='host-spacing'>
          <Form>
            <Field
              as={TextField}
              name="amenities"
              label="Amenities"
              variant="outlined"
              fullWidth
              value={values.amenities}
              onChange={handleChange}
              error={Boolean(errors.amenities)}
              helperText={<ErrorMessage name="amenities" />}
            />
            <AddButton type="submit" variant="contained" color="primary">
              Add
            </AddButton>
          </Form>
          <Box>
            {submittedAmenities.map((amenity, index) => (
              <TitleBox key={index}>
                <TitleText variant="body1">{amenity}</TitleText>
                <RemoveButton variant="outlined" size="small" onClick={() => handleRemoveAmenities(index)}>
                  Remove
                </RemoveButton>
              </TitleBox>
            ))}
          </Box>
          <Button onClick={handleNextForm} className='host-form-submit-buttons' variant="contained" color="primary">Next</Button>
        </FormContainer>
      )}
    </Formik>
  );
};

export default Amenities;