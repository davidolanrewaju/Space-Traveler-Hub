import { NavLink } from 'react-router-dom';
import './navigation.css';

const Navigation = () => (
  <div className="navigation">
    <div className="logo-sec">
      <img src="./planet.png" className="logo" alt="logo" />
      <h1>Space Travelers&apos; Hub</h1>
    </div>
    <div className="nav-link">
      <NavLink to="/rockets" className="link">Rockets</NavLink>
      <NavLink to="/missions" className="link">Missions</NavLink>
      <NavLink to="/my-profile" activeClassName="active" className="link">My Profile</NavLink>
    </div>
  </div>
);

export default Navigation;
