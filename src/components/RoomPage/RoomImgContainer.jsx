
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

function RoomImgContainer({ data }) {
  const imageRender = (val, index) => {
    return (
      <div className='room-image-secondary-child' key={index}> 
        {val.filePath ?
          <img className="room-image" src={`data:${val.mimetype};base64,${val.data}`} alt='room' /> :
          <img className="room-image" src={val.data} alt="room" /> 
        }
      </div>
    );
  };

  return (
    <div className='room-image-container'>
      <div className='room-image-primary'>
        {data.images[0].filePath ?
          <img className="room-image" src={`data:${data.images[0].mimetype};base64,${data.images[0].data}`} alt='room' /> :
          <img className="room-image" src={data.images[0].data} alt='room' />
        }
      </div>
      <div className='room-image-secondary'> 
        {data.images.slice(1).map(imageRender)}
      </div>
    </div>
  );
}

// Prop validation using PropTypes
RoomImgContainer.propTypes = {
  data: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.shape({
      filePath: PropTypes.string,
      mimetype: PropTypes.string,
      data: PropTypes.string.isRequired
    })).isRequired
  }).isRequired
};

export default RoomImgContainer;
