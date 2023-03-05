import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';

export const App: React.FC = () => {
  return (
    <div>
      <div className="m-8">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};
