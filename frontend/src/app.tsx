import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { ToastProvider } from './components/toast-provider';

export const App: React.FC = () => {
  return (
    <div>
      <div className="m-4">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
      <ToastProvider />
    </div>
  );
};
