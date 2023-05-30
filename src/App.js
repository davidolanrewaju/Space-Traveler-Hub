import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route element={<Profile />} exact path="/my-profile" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
