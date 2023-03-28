import React, { useEffect } from 'react';
import { CoffeeCup, HalfMoon, SunLight, TaskList } from 'iconoir-react';
import { useNavigate } from 'react-router-dom';
import { ListView } from '../components/list-view';
import { TimeView } from '../components/time-view';
import { useAuth } from '../hooks';
import { useTasks } from '../hooks';

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { tasks, getAllTasks } = useTasks();
  const navigate = useNavigate();
  const currentTime = new Date();
  const firstName = user && user.name.split(' ')[0];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    getAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex justify-center mb-4">
        <div className="prose">
          <h2 className="flex flex-row gap-4 items-center">
            {currentTime.getHours() < 12 ? (
              <>
                <CoffeeCup className="w-6 h-6" /> {`Good morning${firstName ? ', ' + firstName : ''}`}
              </>
            ) : currentTime.getHours() >= 12 && currentTime.getHours() <= 17 ? (
              <>
                <SunLight className="w-6 h-6" /> {`Good afternoon${firstName ? ', ' + firstName : ''}`}
              </>
            ) : (
              <>
                <HalfMoon className="w-6 h-6" />
                {`Good evening${firstName ? ', ' + firstName : ''}`}
              </>
            )}
          </h2>
        </div>
      </div>
      <div>{tasks && <TimeView tasks={tasks.filter(task => task.due)} />}</div>
      <div className="flex justify-center mb-4">
        <div className="prose">
          <h2 className="flex flex-row gap-4 items-center">
            <TaskList className="w-6 h-6" /> {`Your lists`}
          </h2>
        </div>
      </div>
      <div>{tasks && <ListView tasks={tasks.filter(task => task.listId)} />}</div>
    </div>
  );
};
