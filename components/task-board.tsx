"use client";

import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { Task } from "@taskbrew/prisma/db";
import { useEffect, useId, useState } from "react";
import { TaskBoardColumn } from "./task-board-column";
import { TaskBoardItem } from "./task-board-item";

type Props = {
  tasks: Task[];
  className?: string;
};

export function TaskBoard(props: Props) {
  const [notStartedTasks, setNotStartedTasks] = useState(
    props.tasks.filter((task) => task.status === "NOT_STARTED"),
  );
  const [inProgressTasks, setInProgressTasks] = useState(
    props.tasks.filter((task) => task.status === "IN_PROGRESS"),
  );
  const [completedTasks, setCompletedTasks] = useState(
    props.tasks.filter((task) => task.status === "COMPLETED"),
  );
  const [activeTask, setActiveTask] = useState<Task | undefined>(undefined);
  const id = useId();

  useEffect(() => {
    setNotStartedTasks(
      props.tasks.filter((task) => task.status === "NOT_STARTED"),
    );
    setInProgressTasks(
      props.tasks.filter((task) => task.status === "IN_PROGRESS"),
    );
    setCompletedTasks(
      props.tasks.filter((task) => task.status === "COMPLETED"),
    );
  }, [props.tasks]);

  const findColumn = (id: UniqueIdentifier) => {
    if (
      notStartedTasks.find((task) => task.id === id) ||
      id === "NOT_STARTED"
    ) {
      return "NOT_STARTED";
    } else if (
      inProgressTasks.find((task) => task.id === id) ||
      id === "IN_PROGRESS"
    ) {
      return "IN_PROGRESS";
    } else if (
      completedTasks.find((task) => task.id === id) ||
      id === "COMPLETED"
    ) {
      return "COMPLETED";
    } else {
      return undefined;
    }
  };

  const onDragStart = (e: DragStartEvent) => {
    setActiveTask(props.tasks.find((task) => task.id === e.active.id));
  };

  const onDragEnd = () => {
    setActiveTask(undefined);
  };

  const onDragOver = (e: DragOverEvent) => {
    const activeColumn = findColumn(e.active.id);
    const overColumn = e.over ? findColumn(e.over.id) : undefined;

    if (!activeColumn || !overColumn) return;

    if (activeColumn !== overColumn) {
      // Moved from one column to another
      // Remove the task from the old column
      if (activeColumn === "NOT_STARTED") {
        setNotStartedTasks((tasks) =>
          tasks.filter((task) => task.id !== e.active.id),
        );
      } else if (activeColumn === "IN_PROGRESS") {
        setInProgressTasks((tasks) =>
          tasks.filter((task) => task.id !== e.active.id),
        );
      } else if (activeColumn === "COMPLETED") {
        setCompletedTasks((tasks) =>
          tasks.filter((task) => task.id !== e.active.id),
        );
      }
      // Add the task to the new column
      if (overColumn === "NOT_STARTED") {
        setNotStartedTasks((tasks) => [...tasks, activeTask!]);
      } else if (overColumn === "IN_PROGRESS") {
        setInProgressTasks((tasks) => [...tasks, activeTask!]);
      } else if (overColumn === "COMPLETED") {
        setCompletedTasks((tasks) => [...tasks, activeTask!]);
      }
    }
  };

  return (
    <div className={`flex gap-4 overflow-x-scroll ${props.className}`}>
      <DndContext
        id={id}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <TaskBoardColumn
          type="NOT_STARTED"
          tasks={notStartedTasks}
          activeTask={activeTask}
          canCreateNewTask
        />
        <TaskBoardColumn
          type="IN_PROGRESS"
          tasks={inProgressTasks}
          activeTask={activeTask}
        />
        <TaskBoardColumn
          type="COMPLETED"
          tasks={completedTasks}
          activeTask={activeTask}
        />
        <DragOverlay>
          {activeTask ? <TaskBoardItem task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
