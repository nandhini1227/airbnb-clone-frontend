import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { showNotification } from '../../assets/alerts/sweetAlert';

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  let profileMenuRef = useRef();

  const handleLogin = () => {
    navigate('/login');
  }

  const handleRegister = () => {
    navigate('/register');
  }

  const handleManageListing = () => {
    navigate('/dashboard');
  }

  const handleMyBookings = () => {
    navigate('/mybookings');
  }

  const handleLogOut = async () => {
    setAuth(0);
    await logOut();
    navigate('/login');
  }

  const logOut = async () => {
    try {
      const response = await axiosPrivate.get(`/auth/logout`);
      showNotification(response.data.status, response.data.message);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    let handler = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const profileMenuHandler = () => {
    setOpen(!open);
  }

  return (
    <div className='menu-container'>
      <div className='profile-menu' onClick={profileMenuHandler} ref={profileMenuRef}>
        <MenuRoundedIcon />
        <AccountCircleRoundedIcon />
      </div>
      <div className={`profile-menu-dropdown ${open ? "active" : "inactive"}`}>
        <ul>
          {auth?.data?.token ?
            <li className='dropdown-item' onClick={handleManageListing}>Manage listing</li>
            :
            <li className='dropdown-item' onClick={handleLogin}>Log in</li>
          }
          {auth?.data?.token ?
            <li className='dropdown-item' onClick={handleMyBookings}>My Bookings</li>
            :
            <li className='dropdown-item' onClick={handleRegister}>Sign Up</li>
          }
          <hr className='line' />
          {auth?.data?.token ?
            <li className='dropdown-item' onClick={handleLogOut}>Log Out</li>
            :
            <li className='dropdown-item' >Airbnb your home</li>
          }
          <li className='dropdown-item'>Help</li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileMenu;
