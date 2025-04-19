import React from 'react';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import Footer from '../common/Footer.jsx';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;