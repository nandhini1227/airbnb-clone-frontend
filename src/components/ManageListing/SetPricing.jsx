import  { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Grid, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { axiosPrivate } from '../../Axios/axios';
import { showNotification } from '../../assets/alerts/sweetAlert';
import BarLoader from '../../assets/spinner/BarLoader';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const SetPricing = ({ item }) => {

  const [openCard2, setOpenCard2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const base = item?.pricing?.basePrice ? item.pricing.basePrice : 0;
  const clean = item?.pricing?.cleaningFee ? item.pricing.cleaningFee : 0;
  const service = item?.pricing?.serviceFee ? item.pricing.serviceFee : 0;
  const [basePrice, setBasePrice] = useState(base);
  const [cleaningFee, setCleaningFee] = useState(clean);
  const [serviceFee, setServiceFee] = useState(service);

  const handleOpenCard2 = () => { setOpenCard2(true); };

  const handleCloseCard2 = () => { setOpenCard2(false); };

  const handleSaveCard2 = async () => {
    const pricing = {
      basePrice,
      cleaningFee,
      serviceFee
    }
    setIsLoading(true);
    await updateHostPricing(id, { pricing })
    handleCloseCard2();
    setIsLoading(false);
  };

  const updateHostPricing = async (ids, data) => {
    try {
      const response = await axiosPrivate.patch(`/${ids}`, data);
      showNotification(response.data.status, response.data.message);
    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true })
    }
  }

  return (
    <>
      {
        !isLoading ?
          <Grid item sx={{ textAlign: 'center' }} xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <h2>Pricing</h2>
              <h3>Price per Night</h3>
              <p>Update Cleaning and Service Fee</p>
              <Button sx={{ backgroundColor: '#ff385c', color: '#fffff' }} variant="contained" onClick={handleOpenCard2}>Set the Prices</Button>
              <Dialog open={openCard2} onClose={handleCloseCard2}>
                <DialogTitle>Set pricing</DialogTitle>
                <DialogContent >
                  <TextField
                    label="Base Price"
                    type="number"
                    value={basePrice}
                    onChange={(event) => setBasePrice(event.target.value)}
                    sx={{ marginTop: '1rem' }}
                    placeholder='Enter the price per night'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                  <TextField marginTop={2}
                    label="Cleaning Fee"
                    type="number"
                    value={cleaningFee}
                    sx={{ marginTop: '1rem' }}
                    onChange={(event) => setCleaningFee(event.target.value)}
                    placeholder='Cleaning charges per night'
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                  <TextField marginTop={2}
                    label="Service Fee"
                    type="number"
                    value={serviceFee}
                    sx={{ marginTop: '1rem' }}
                    placeholder='Airbnb Service Fee'
                    onChange={(event) => setServiceFee(event.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseCard2}>Cancel</Button>
                  <Button onClick={handleSaveCard2}>Save</Button>
                </DialogActions>
              </Dialog>
            </Paper>
          </Grid> :
          <div style={{ position: 'relative', width: '30%' }}>
            <BarLoader />
          </div>
      }
    </>
  );
};

// Prop validation using PropTypes
SetPricing.propTypes = {
  item: PropTypes.shape({
    pricing: PropTypes.shape({
      basePrice: PropTypes.number,
      cleaningFee: PropTypes.number,
      serviceFee: PropTypes.number
    })
  })
};

export default SetPricing;
