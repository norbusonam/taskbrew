import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import { TimeView } from '../components/time-view';
import { useAuth } from '../hooks';
import { Todo } from '../types';

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const currentTime = new Date();
  const firstName = user && user.name.split(' ')[0];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    getAllTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllTodos = () => {
    setIsLoading(true);
    api
      .getTodos(new Date(2000, 0, 1), new Date(2100, 0, 1))
      .then(res => {
        setTodos(res.data.todos);
      })
      .catch(() => {
        console.log('Could not get todos');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <div className="prose">
          <h2>
            {currentTime.getHours() < 12
              ? `☕️ Good morning${firstName ? ', ' + firstName : ''}`
              : currentTime.getHours() >= 12 && currentTime.getHours() <= 17
              ? `☀️ Good afternoon${firstName ? ', ' + firstName : ''}`
              : `🌕 Good evening${firstName ? ', ' + firstName : ''}`}
          </h2>
        </div>
      </div>
      <div>
        {isLoading && <p>Loading...</p>}
        {todos && <TimeView todos={todos} />}
      </div>
    </div>
  );
};
