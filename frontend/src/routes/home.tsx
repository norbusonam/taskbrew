import React, { useEffect } from 'react';
import { CoffeeCup, HalfMoon, SunLight, TaskList } from 'iconoir-react';
import { useNavigate } from 'react-router-dom';
import { ListView } from '../components/list-view';
import { TimeView } from '../components/time-view';
import { useAuth } from '../hooks';
import { useTasks } from '../hooks';
import { closestCenter, DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';

export const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { tasks, getAllTasks } = useTasks();
  const navigate = useNavigate();
  const currentTime = new Date();
  const firstName = user && user.name.split(' ')[0];
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

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
      <DndContext sensors={sensors} collisionDetection={closestCenter}>
        <div className="flex justify-center mb-4">
          <div className="prose">
            <h2 className="flex flex-row gap-3 items-center">
              {currentTime.getHours() < 12 ? (
                <>
                  <CoffeeCup className="w-6 h-6" />
                  {`Good morning${firstName ? ', ' + firstName : ''}`}
                </>
              ) : currentTime.getHours() >= 12 && currentTime.getHours() <= 17 ? (
                <>
                  <SunLight className="w-6 h-6" />
                  {`Good afternoon${firstName ? ', ' + firstName : ''}`}
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
        <div className="mb-6">{tasks && <ListView tasks={tasks.filter(task => task.listId)} />}</div>
      </DndContext>
    </div>
  );
};
