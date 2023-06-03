/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { reserveRocket } from '../redux/rockets/rocketsSlice';

const Rocket = ({ rocket }) => {
  const dispatch = useDispatch();
  const [changeColor, setChangeColor] = useState(false);
  const handleChangeColor = () => {
    setChangeColor(!changeColor);
  };
  const handleReserveRocket = () => {
    dispatch(reserveRocket(rocket.id));
  };

  return (
    <div className="rocket-details">
      <img className="rocket-img" src={rocket.flickr_images[0]} alt={rocket.rocket_name} />
      <div className="rocket-info">
        <h3>{rocket.rocket_name}</h3>
        <div className="disc-res">
          {rocket.reserved && <span className="reserved-btn">Reserved</span>}
          <p>{rocket.description}</p>
        </div>
        <button
          className={`${changeColor === true ? 'cancel-reserve-btn' : 'reserve-btn'}`}
          type="button"
          onClick={() => {
            handleReserveRocket();
            handleChangeColor();
          }}
          data-testid={`reserve-button-${rocket.id}`}
        >
          {rocket.reserved ? 'Cancel reservation' : 'Reserve rocket'}
        </button>
      </div>
    </div>
  );
};

Rocket.propTypes = {
  rocket: PropTypes.shape({
    flickr_images: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
    rocket_name: PropTypes.string,
    description: PropTypes.string,
    reserved: PropTypes.bool,
  }),
};

export default Rocket;
