import  { useContext, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import logo from "../../assets/logo/long-logo.png";
import "./style.css";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LanguageIcon from '@mui/icons-material/Language';
import ProfileMenu from "./ProfileMenu";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { SearchDataContext } from "../../context/SearchDataProvider";

function Header(props) {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const { setSearchData } = useContext(SearchDataContext);
  const searchBarRef = useRef(null);
  const navigate = useNavigate();
  const searchFilterRef = useRef(null);

  const handleBecomeHost = () => {
    navigate('/becomehost');
  }

  const handleHome = () => {
    navigate('/');
    setSearchData('');
  }

  const handleSearchBarChange = () => {
    setOpenSearchBar(!openSearchBar);
  };
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target) &&
        searchFilterRef.current &&
        !searchFilterRef.current.contains(event.target)
      ) {
        setOpenSearchBar(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={searchBarRef} className="navbar">
      <img onClick={handleHome} src={logo} alt="airbnb logo" className="navbar-logo" />
      <div className={`search-bar ${openSearchBar ? 'active' : ''}`} onClick={handleSearchBarChange}>
        <div className="search-bar-text">Anywhere</div>
        <div className="search-bar-text search-bar-text1">Anyweek</div>
        <div className="search-bar-text2">Add Guests</div>
        <div className="search-icon-div">
          <SearchRoundedIcon className="search-icon" sx={{ fontSize: "1.2rem" }} />
        </div>
      </div>
      <div className={`search-filter-div ${openSearchBar ? 'active' : 'inactive'}`} ref={searchFilterRef}>
        <SearchBar onSearch={handleSearchBarChange} searchParam={props.searchParam} />
      </div>
      <div className="profile-container">
        {!openSearchBar && <div className="airbnb-your-home" onClick={handleBecomeHost}>Airbnb your home</div>}
        <div className="global-icon-div airbnb-your-home">
          <LanguageIcon sx={{ fontSize: "1.2rem" }} />
        </div>
        <div className="profile-div">
          <ProfileMenu />
        </div>
      </div>
    </div>
  );
}

// Add prop type validation for searchParam
Header.propTypes = {
  searchParam: PropTypes.any
};

export default Header;
