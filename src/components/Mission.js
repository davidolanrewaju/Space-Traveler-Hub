import '../styles/mission.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconContext } from 'react-icons';
import { FaTwitter, FaWikipediaW } from 'react-icons/fa';
import { AiOutlineLink } from 'react-icons/ai';
import { getMissions } from '../redux/missions/missionSlice';

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
                    <a aria-label="website-button" href={mission.website}><AiOutlineLink /></a>
                    <a aria-label="wiki-button" href={mission.wikipedia}><FaWikipediaW /></a>
                    <a aria-label="twitter-button" href={mission.twitter}><FaTwitter /></a>
                  </div>
                </td>
                <td className="table-btns">
                  <button type="button" className="member-btn">Not A Member</button>
                </td>
                <td className="table-btns">
                  <button type="button" className="join-btn">Join Mission</button>
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
