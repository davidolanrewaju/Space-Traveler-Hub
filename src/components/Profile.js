import { useSelector } from 'react-redux';
import '../styles/profile.css';

const Profile = () => {
  const rocketsList = useSelector((state) => state.rockets.rockets);
  const reservedRockets = rocketsList.filter((rocket) => rocket.reserved === true);

  const { missions } = useSelector((state) => state.mission);
  const reservedMission = missions.filter((mission) => mission.reserved === true);

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
                <li className="reserved-list" key={rocket.id}>{rocket.rocket_name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="reserved-mission">
        <h3>My Missions</h3>
        <div className="mission-list-container">
          {reservedMission.length === 0 ? (
            <p>No Missions Yet!</p>
          ) : (
            <ul className="mission-lists">
              {reservedMission.map((mission) => (
                <li className="mission-list" key={mission.mission_id}>{mission.mission_name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
