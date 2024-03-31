import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchDataContext = createContext({});

function SearchDataProvider({ children }) {
  const [searchData, setSearchData] = useState('');
  
  return (
    <SearchDataContext.Provider value={{ searchData, setSearchData }}>
      {children}
    </SearchDataContext.Provider>
  );
}

SearchDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchDataProvider;
