
import PropTypes from 'prop-types'; 
import { BeatLoader } from 'react-spinners';

const BarLoader = ({ isLoading = true, ...rest }) => { 
  return (
    <BeatLoader
      cssOverride={{ marginLeft: '45%', marginTop: '50%' }}
      size={'1vw'}
      color={'#123abc'}
      
      loading={isLoading}
      {...rest} 
    >
      {/* Optional content to display while loading */}
    </BeatLoader>
  );
};


BarLoader.propTypes = {
  isLoading: PropTypes.bool 
};

export default BarLoader;
