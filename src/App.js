import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import Profile from './components/Profile';
import Rockets from './components/Rockets';
import Mission from './components/Mission';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route element={<Navigate to="/rockets" />} path="/" />
          <Route element={<Mission />} exact path="/missions" />
          <Route element={<Profile />} exact path="/my-profile" />
          <Route element={<Rockets />} exact path="/" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
