import  { useContext, useEffect } from 'react';
import { Container, Grid, } from '@mui/material';
import SetPricing from './SetPricing';
import SetDates from './SetDates';
import SetProfileFinal from './SetProfileFinal';
import AuthContext from '../../context/AuthProvider';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ManageListing = () => {
  const {auth} = useContext(AuthContext)
  const {id} = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleComponentRender();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleComponentRender = () => {
    if(auth?.data?.token){
    return (
      <Container sx={{margin: '3rem auto'}} className='manage-listing-dashboard'>
      <Grid container  spacing={10}>
        <SetDates item={id}/>
        <SetPricing item={id}/>
        <SetProfileFinal item={id}/>
      </Grid>
    </Container>
    )}  else {
      navigate('/login', {state: {from: location}})
      return null;
    }
    }

  return (
    <>
      {handleComponentRender()}
    </>
  );
};

export default ManageListing;