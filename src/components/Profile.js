import { useSelector } from 'react-redux';

const Profile = () => {
  const rocketsList = useSelector((state) => state.rockets.rockets);
  const reservedRockets = rocketsList.filter((rocket) => rocket.reserved === true);

  return (
    <div className="reserved-rockets-con">
      <div className="reserved-table">
        <h3>My Rockets</h3>
        <div className="list-con">
          {reservedRockets.length === 0 ? (
            <span>Not reserved rockets!</span>
          ) : (
            <ul>
              {reservedRockets.map((rocket) => (
                <li key={rocket.id}>{rocket.rocket_name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
