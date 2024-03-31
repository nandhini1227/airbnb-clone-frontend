import { useState } from 'react';
import { Grid, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import SetProfileForm from './SetProfileForm';
import { showNotification } from '../../assets/alerts/sweetAlert';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import BarLoader from '../../assets/spinner/BarLoader';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const SetProfileFinal = () => {
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [openCard3, setOpenCard3] = useState(false);

  const handleOpenCard3 = () => {
    setOpenCard3(true);
  };

  const handleCloseCard3 = () => {
    setOpenCard3(false);
  };

  const handleSaveCard3 = (data) => {
    const host = {...data}
    setIsLoading(true);
    updateHostProfile(id, {host})
    handleCloseCard3();
    setIsLoading(false);
  };

  const updateHostProfile = async (ids, data) => {
    try {
      const response = await axiosPrivate.patch(`/${ids}`, data);
      showNotification(response.data.status, response.data.message);
    } catch (err) {
      console.error(err);
      navigate('/login', {state:{from: location}, replace: true})
    }
  }

  return (
    <>
       { 
        !isLoading?
        <Grid sx={{textAlign:'center'}}  item xs={12} sm={6} md={4}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <h2>Profile</h2>
            <h3>Update Host Profile</h3>
            <p>Edit photo, name and about host</p>
            <Button  sx={{backgroundColor:'#ff385c', color: '#fffff'}} variant="contained"  onClick={handleOpenCard3}>Edit Profile</Button>
            <Dialog open={openCard3} onClose={handleCloseCard3}>
              <DialogTitle>Host Profile</DialogTitle>
              <DialogContent>
                <SetProfileForm handleSaveCard3={handleSaveCard3} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseCard3}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </Paper>
        </Grid>:
        <div style={{position:'relative', width:'30%'}}>
          <BarLoader/>
        </div>
    }
    </>
  );
};

export default SetProfileFinal;
