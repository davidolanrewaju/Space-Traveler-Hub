import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import Rocket from './components/Rockets';
import Mission from './components/Mission';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route element={<Mission />} exact path="/missions" />
          <Route element={<Profile />} exact path="/my-profile" />
          <Route element={<Rocket />} exact path="/" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
