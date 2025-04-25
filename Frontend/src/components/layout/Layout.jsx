import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header.jsx';
import Sidebar from '../common/Sidebar.jsx';
import Footer from '../common/Footer.jsx';

const Layout = () => {
  return (
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="content-area">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;