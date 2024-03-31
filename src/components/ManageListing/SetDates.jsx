import  { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Grid, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { showNotification } from '../../assets/alerts/sweetAlert';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BarLoader from '../../assets/spinner/BarLoader';

const SetDates = ({ item }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const start = item?.stayDate?.startDay ? item.stayDate.startDay : '';
  const end = item?.stayDate?.endDay ? item.stayDate.endDay : '';
  const [open, setOpen] = useState(false);
  const [startDay, setStartDay] = useState(start);
  const [isLoading, setIsLoading] = useState(false);
  const [endDay, setEndDay] = useState(end);

  const handleOpen = () => { setOpen(true); };

  const handleClose = () => { setOpen(false); };

  const handleSave = async () => {
    const stayDate = { startDay, endDay };
    setIsLoading(true);
    await updateHostData(id, { stayDate });
    handleClose();
    setIsLoading(false);
  };

  const updateHostData = async (ids, data) => {
    try {
      const response = await axiosPrivate.patch(`/${ids}`, data);
      showNotification(response.data.status, response.data.message);
    } catch (err) {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    }
  };

  return (
    <>
      {!isLoading ?
        <Grid sx={{ textAlign: 'center' }} item xs={12} sm={6} md={4}>
          <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
            <h2>Staying Date</h2>
            <h3>Staying Period Availablility</h3>
            <p>Update the Staying period Availablility</p>
            <Button variant="contained" sx={{ backgroundColor: '#ff385c', color: '#fffff' }} onClick={handleOpen}>Set Dates</Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Set Dates</DialogTitle>
              <DialogContent>
                <Grid container spacing={4}>
                  <Grid item marginTop={2} xs={6}>
                    <TextField
                      label="Start Day"
                      type="date"
                      value={startDay}
                      onChange={(event) => setStartDay(event.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item marginTop={2} xs={6}>
                    <TextField
                      label="End Day"
                      type="date"
                      value={endDay}
                      onChange={(event) => setEndDay(event.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
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
SetDates.propTypes = {
  item: PropTypes.shape({
    stayDate: PropTypes.shape({
      startDay: PropTypes.string,
      endDay: PropTypes.string
    })
  })
};

export default SetDates;
