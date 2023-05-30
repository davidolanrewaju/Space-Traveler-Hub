/* eslint-disable arrow-body-style */
import './navigation.css';

const Navigation = () => {
  return (
    <div className="navigation">
      <div className="logo-sec">
        <img src="./planet.png" className="logo" alt="logo" />
        <h1>Space Travelers&apos; Hub</h1>
      </div>
      <div className="nav-link">
        <li><a href="/">Rockets</a></li>
        <li><a href="/">Missions</a></li>
        <li><a className="profile-link" href="/">My Profile</a></li>
      </div>
    </div>
  );
};

export default Navigation;
