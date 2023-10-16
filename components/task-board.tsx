"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Task } from "@taskbrew/prisma/db";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import toast from "react-hot-toast";
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
  const router = useRouter();
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

  const onDragEnd = (e: DragEndEvent) => {
    setActiveTask(undefined);
    const activeColumn = findColumn(e.active.id);
    const overColumn = e.over ? findColumn(e.over.id) : undefined;
    const originalTask = props.tasks.find((task) => task.id === e.active.id);

    if (!activeColumn || !overColumn || !originalTask) return;

    // figure out new order
    const tasks =
      activeColumn === "NOT_STARTED"
        ? notStartedTasks
        : activeColumn === "IN_PROGRESS"
        ? inProgressTasks
        : completedTasks;
    const fromIdx = tasks.findIndex((task) => task.id === e.active.id);
    const toIdx = tasks.findIndex((task) => e.over && task.id === e.over.id);
    const reorderedTasks = arrayMove(tasks, fromIdx, toIdx);

    // optimistically update state
    if (activeColumn === "NOT_STARTED") {
      setNotStartedTasks(reorderedTasks);
    } else if (activeColumn === "IN_PROGRESS") {
      setInProgressTasks(reorderedTasks);
    } else if (activeColumn === "COMPLETED") {
      setCompletedTasks(reorderedTasks);
    }

    // update server
    toast
      .promise(
        Promise.all([
          originalTask.status !== overColumn
            ? fetch(`/api/task/${e.active.id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  status: overColumn,
                }),
              }).then((res) => {
                if (!res.ok) {
                  throw new Error();
                }
              })
            : Promise.resolve(),
          fetch(`/api/task/reorder`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "BOARD",
              tasks: reorderedTasks.map((task, i) => ({
                id: task.id,
                order: i,
              })),
            }),
          }).then((res) => {
            if (!res.ok) {
              throw new Error();
            }
          }),
        ]),
        {
          loading: "Updating task...",
          success: "Task updated!",
          error: "Failed to update task",
        },
      )
      // need to do this to avoid unhandled promise rejection
      // can't do reset because one of the promises might have
      // succeeded, while the other failed
      .catch(() => {})
      .finally(() => router.refresh());
  };

  const onDragOver = (e: DragOverEvent) => {
    const activeColumn = findColumn(e.active.id);
    const overColumn = e.over ? findColumn(e.over.id) : undefined;

    if (!activeColumn || !overColumn) return;

    if (activeColumn !== overColumn) {
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
