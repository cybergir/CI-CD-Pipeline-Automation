import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/api';
import './Header.css';  // Import the CSS file

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <h1>Welcome back !!</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
