
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation
import { ClipLoader } from 'react-spinners';

const SpinLoader = ({ isLoading = true, ...rest }) => { 
  return (
    <ClipLoader
      cssOverride={{ marginLeft: '45%', marginTop: '10vh' }}
      size={'10vw'}
      color={'#123abc'}
      
      loading={isLoading}
      {...rest} 
    >
      {/* Optional content to display while loading */}
    </ClipLoader>
  );
};


SpinLoader.propTypes = {
  isLoading: PropTypes.bool 
};

export default SpinLoader;
