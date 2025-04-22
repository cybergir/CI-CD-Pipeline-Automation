import React from 'react';
import './Footer.css';  // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Garnetia Agrovet. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
