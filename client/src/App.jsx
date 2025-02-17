import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUserId } from './store/slices/authSlice';
import MoodMap from './pages/Moodmap';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (token && userId) {
      dispatch(setToken(token));
      dispatch(setUserId(userId));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(window.location.pathname);
    }
    // Only redirect to login if not logged in and currently on a protected route
    // if (!isLoggedIn && window.location.pathname !== '/') {
    //   navigate('/', { replace: true });
    // }
  }, [isLoggedIn, navigate]);

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/moodmap" element={<MoodMap />} />
      </Routes>
    </div>
  )
}

export default App;