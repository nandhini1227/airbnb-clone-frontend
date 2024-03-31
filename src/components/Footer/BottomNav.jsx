import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { showNotification } from '../../assets/alerts/sweetAlert';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  color: var(--medium-grey);
  &.Mui-selected {
    color: var(--theme);
  }
`);

  const logOut = async () => {
    try {
      const response = await axiosPrivate.get(`/auth/logout`);
      showNotification(response.data.status, response.data.message);
    } catch (err) {
      console.error(err);
    }
  }

  const handleLogOut = async () => {
    setAuth(0)
    await logOut();
    navigate('/login');
  }

  const handleHome = async () => {
    navigate('/');
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className='bottom-nav' style={{ borderTop: '1px solid var(--grey)' }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction className='bottom-nav-option' onClick={handleHome} label="Explore" icon={<SearchRoundedIcon sx={{ fontSize: "1.5rem" }} />} />
        <BottomNavigationAction className='bottom-nav-option' label="Wishlists" icon={<FavoriteBorderIcon sx={{ fontSize: "1.5rem" }} />} />
        {!auth?.data?.token ?
          <BottomNavigationAction className='bottom-nav-option' onClick={handleLogin} label="Log in" icon={<AccountCircleOutlinedIcon sx={{ fontSize: "1.5rem" }} />} /> :
          <BottomNavigationAction className='bottom-nav-option' onClick={handleLogOut} label="Log Out" icon={<AccountCircleOutlinedIcon sx={{ fontSize: "1.5rem" }} />} />
        }
      </BottomNavigation>
    </div>
  );
}
