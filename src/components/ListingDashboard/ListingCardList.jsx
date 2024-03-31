import  { useContext } from 'react';
import ListingCard from './ListingCard';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';

const ListingCardsList = () => {
  const navigate = useNavigate();
  const {auth} = useContext(AuthContext);
  const location = useLocation();

  const handleComponentRender = () => {
    if(auth?.data?.token){
    return (
      <ListingCard  />
      )}  else {
      navigate('/login', {state: {from: location}})
      return null;
    }
    }
  return (
    <div>
      {handleComponentRender()}
    </div>
  );
};

export default ListingCardsList;