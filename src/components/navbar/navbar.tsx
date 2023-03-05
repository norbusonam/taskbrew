import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-base-200 rounded-xl border-2 border-base-100 shadow-lg">
      <div className="navbar-start">
        <Link to={'/'} className="btn btn-ghost normal-case text-xl">
          todo
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={'about'}>About Us</Link>
          </li>
          <li>
            <Link to={'pricing'}>Pricing</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button className="btn">Get started</button>
      </div>
    </nav>
  );
};
