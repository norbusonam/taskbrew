import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { useAuth } from '../hooks';

type AuthProps = {
  type: 'login' | 'signup';
};

export const Auth: React.FC<AuthProps> = props => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { onAuthenticated, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // if user is already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (props.type === 'login') {
      onLogin();
    } else {
      onSignup();
    }
  };

  const onSignup = () => {
    setIsLoading(true);
    api
      .signup({ email, name, password })
      .then(res => onAuthenticated(res.data.user, res.data.token))
      .catch(() => {
        console.error('Signup failed');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onLogin = () => {
    setIsLoading(true);
    api
      .login({ email, password })
      .then(res => onAuthenticated(res.data.user, res.data.token))
      .catch(() => {
        console.error('Login failed');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex justify-center my-20">
      <div className="card bg-base-200 shadow-md">
        <div className="card-body">
          <div className="tabs tabs-boxed bg-inherit justify-center">
            <Link to="/login" className={`tab ${props.type === 'login' && 'tab-active'}`}>
              Login
            </Link>
            <Link to="/signup" className={`tab ${props.type === 'signup' && 'tab-active'}`}>
              Signup
            </Link>
          </div>
          <div className="card-title">{props.type === 'login' ? 'Login' : 'Signup'}</div>
          <form onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">What's your email?</span>
              </label>
              <input
                type="email"
                placeholder="john@email.com"
                className="input input-bordered"
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className={`form-control ${props.type === 'login' && 'hidden'}`}>
              <label className="label">
                <span className="label-text">What's your name?</span>
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="input input-bordered w-full"
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Enter a password</span>
              </label>
              <input
                type="password"
                placeholder="************"
                className="input input-bordered w-full"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className={`form-control ${props.type === 'login' && 'hidden'}`}>
              <label className="label">
                <span className="label-text">Confirm password</span>
              </label>
              <input
                type="password"
                placeholder="************"
                className={`input input-bordered w-full ${password !== passwordConfirmation && 'input-error'}}`}
                onChange={e => setPasswordConfirmation(e.target.value)}
              />
            </div>
            <div className="card-actions justify-center mt-5">
              <button type="submit" className={`btn btn-primary ${isLoading && 'loading'}`}>
                {props.type === 'login' ? 'Login' : 'Signup'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
