import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Landing } from './routes/landing';
import { About } from './routes/about';
import { Pricing } from './routes/pricing';
import { App } from './app';
import { Auth } from './routes/auth';
import { Home } from './routes/home';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Landing />,
      },
      {
        path: '/login',
        element: <Auth type="login" />,
      },
      {
        path: '/signup',
        element: <Auth type="signup" />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/pricing',
        element: <Pricing />,
      },
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
