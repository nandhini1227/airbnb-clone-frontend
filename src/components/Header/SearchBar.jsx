import { useContext, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import { useNavigate } from 'react-router-dom';
import { SearchDataContext } from '../../context/SearchDataProvider';

const SearchBar = (props) => {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(0);
  const { setSearchData } = useContext(SearchDataContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchData = { location, checkInDate, checkOutDate, guests };
    setSearchData(searchData);
    props.onSearch(); // Call the onSearch function passed as a prop
    setLocation('');
    setCheckInDate('');
    setCheckOutDate('');
    setGuests(0);
    navigate('/');
  };

  return (
    <div className="dropdown-search-bar">
      {/* Your input elements */}
      <button className="dropdown-search-button" onClick={handleSearch} type="button">
        Search
      </button>
    </div>
  );
};

// Add prop type validation for onSearch prop
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
