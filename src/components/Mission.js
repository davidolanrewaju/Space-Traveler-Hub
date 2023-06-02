import '../styles/mission.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconContext } from 'react-icons';
import { FaTwitter, FaWikipediaW } from 'react-icons/fa';
import { AiOutlineLink } from 'react-icons/ai';
import { getMissions, joinMission, leaveMission } from '../redux/missions/missionSlice';

const Mission = () => {
  const dispatch = useDispatch();
  const { missions, isLoading } = useSelector((state) => state.mission);

  useEffect(() => {
    dispatch(getMissions());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="mission-container">
      <IconContext.Provider value={{ color: '#34343a', className: 'icons', size: '18px' }}>
        <table id="table-container">
          <thead>
            <tr>
              <th>Mission</th>
              <th>Description</th>
              <th>Status</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {missions.map((mission) => (
              <tr key={mission.mission_id}>
                <td className="mission-name">{mission.mission_name}</td>
                <td className="mission-description">
                  {mission.description}
                  <br />
                  <div className="logo-container">
                    <a aria-label="website-button" href={mission.website} target="_blank" rel="noopener noreferrer"><AiOutlineLink /></a>
                    <a aria-label="wiki-button" href={mission.wikipedia} target="_blank" rel="noopener noreferrer"><FaWikipediaW /></a>
                    <a aria-label="twitter-button" href={mission.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                  </div>
                </td>
                <td className="table-btns">
                  {!mission.reserved && (
                    <button type="button" className="not-member-btn">
                      Not A Member
                    </button>
                  )}
                  {mission.reserved && (
                    <button type="button" className="member-btn">
                      Active Member
                    </button>
                  )}
                </td>
                <td className="table-btns">
                  {!mission.reserved && (
                    <button
                      type="button"
                      className="join-btn"
                      onClick={() => {
                        dispatch(joinMission(mission.mission_id));
                      }}
                    >
                      Join Mission
                    </button>
                  )}
                  {mission.reserved && (
                    <button
                      type="button"
                      className="leave-btn"
                      onClick={() => {
                        dispatch(leaveMission(mission.mission_id));
                      }}
                    >
                      Leave Mission
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </IconContext.Provider>
    </div>
  );
};

export default Mission;
