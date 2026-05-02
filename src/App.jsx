import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MobileLayout from './layouts/MobileLayout';
import Home from './pages/Home';
import Tracking from './pages/Tracking';
import Alerts from './pages/Alerts';
import Search from './pages/Search';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <MobileLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </MobileLayout>
    </Router>
  );
}

export default App;
