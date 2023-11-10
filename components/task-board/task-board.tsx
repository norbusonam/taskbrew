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
import { reorderTasks } from "@taskbrew/server-actions/reorder-tasks";
import { updateTask } from "@taskbrew/server-actions/update-task";
import { useEffect, useId, useState } from "react";
import toast from "react-hot-toast";
import { TaskBoardColumn } from "./task-board-column";
import { TaskBoardItem } from "./task-board-item";

type Props = {
  tasks: Task[];
  className?: string;
};

export function TaskBoard(props: Props) {
  const [optimisticNotStartedTasks, setOptimisticNotStartedTasks] = useState(
    props.tasks.filter((task) => task.status === "NOT_STARTED"),
  );
  const [optimisticInProgressTasks, setOptimisticInProgressTasks] = useState(
    props.tasks.filter((task) => task.status === "IN_PROGRESS"),
  );
  const [optimisticBlockedTasks, setOptimisticBlockedTasks] = useState(
    props.tasks.filter((task) => task.status === "BLOCKED"),
  );
  const [optimisticCompletedTasks, setOptimisticCompletedTasks] = useState(
    props.tasks.filter((task) => task.status === "COMPLETED"),
  );
  const [activeTask, setActiveTask] = useState<Task | undefined>(undefined);
  const id = useId();

  const resetOptimisticState = () => {
    setOptimisticNotStartedTasks(
      props.tasks.filter((task) => task.status === "NOT_STARTED"),
    );
    setOptimisticInProgressTasks(
      props.tasks.filter((task) => task.status === "IN_PROGRESS"),
    );
    setOptimisticBlockedTasks(
      props.tasks.filter((task) => task.status === "BLOCKED"),
    );
    setOptimisticCompletedTasks(
      props.tasks.filter((task) => task.status === "COMPLETED"),
    );
  };

  useEffect(() => {
    resetOptimisticState();
    // resetOptimisticState only changes when props.tasks changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tasks]);

  const findColumn = (id: UniqueIdentifier) => {
    if (
      optimisticNotStartedTasks.find((task) => task.id === id) ||
      id === "NOT_STARTED"
    ) {
      return "NOT_STARTED";
    } else if (
      optimisticInProgressTasks.find((task) => task.id === id) ||
      id === "IN_PROGRESS"
    ) {
      return "IN_PROGRESS";
    } else if (
      optimisticBlockedTasks.find((task) => task.id === id) ||
      id === "BLOCKED"
    ) {
      return "BLOCKED";
    } else if (
      optimisticCompletedTasks.find((task) => task.id === id) ||
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
        ? optimisticNotStartedTasks
        : activeColumn === "IN_PROGRESS"
        ? optimisticInProgressTasks
        : activeColumn === "BLOCKED"
        ? optimisticBlockedTasks
        : optimisticCompletedTasks;
    const fromIdx = tasks.findIndex((task) => task.id === e.active.id);
    const toIdx = tasks.findIndex((task) => e.over && task.id === e.over.id);
    const reorderedTasks = arrayMove(tasks, fromIdx, toIdx);

    // optimistically update state
    if (activeColumn === "NOT_STARTED") {
      setOptimisticNotStartedTasks(reorderedTasks);
    } else if (activeColumn === "IN_PROGRESS") {
      setOptimisticInProgressTasks(reorderedTasks);
    } else if (activeColumn === "BLOCKED") {
      setOptimisticBlockedTasks(reorderedTasks);
    } else if (activeColumn === "COMPLETED") {
      setOptimisticCompletedTasks(reorderedTasks);
    }

    // update server
    toast
      .promise(
        Promise.all([
          originalTask.status !== overColumn
            ? updateTask(originalTask.id, {
                status: overColumn,
              })
            : Promise.resolve(),

          reorderTasks(
            "BOARD",
            reorderedTasks.map((task, i) => ({
              id: task.id,
              order: i,
            })),
          ),
        ]),
        {
          loading: "Updating task...",
          success: "Task updated!",
          error: "Failed to update task",
        },
      )
      .catch(() => {
        // revert optimistic state
        resetOptimisticState();
      });
  };

  const onDragOver = (e: DragOverEvent) => {
    const activeColumn = findColumn(e.active.id);
    const overColumn = e.over ? findColumn(e.over.id) : undefined;

    if (!activeColumn || !overColumn) return;

    if (activeColumn !== overColumn) {
      // Remove the task from the old column
      if (activeColumn === "NOT_STARTED") {
        setOptimisticNotStartedTasks((tasks) =>
          tasks.filter((task) => task.id !== e.active.id),
        );
      } else if (activeColumn === "IN_PROGRESS") {
        setOptimisticInProgressTasks((tasks) =>
          tasks.filter((task) => task.id !== e.active.id),
        );
      } else if (activeColumn === "BLOCKED") {
        setOptimisticBlockedTasks((tasks) =>
          tasks.filter((task) => task.id !== e.active.id),
        );
      } else if (activeColumn === "COMPLETED") {
        setOptimisticCompletedTasks((tasks) =>
          tasks.filter((task) => task.id !== e.active.id),
        );
      }
      // Add the task to the new column
      if (overColumn === "NOT_STARTED") {
        setOptimisticNotStartedTasks((tasks) => [...tasks, activeTask!]);
      } else if (overColumn === "IN_PROGRESS") {
        setOptimisticInProgressTasks((tasks) => [...tasks, activeTask!]);
      } else if (overColumn === "BLOCKED") {
        setOptimisticBlockedTasks((tasks) => [...tasks, activeTask!]);
      } else if (overColumn === "COMPLETED") {
        setOptimisticCompletedTasks((tasks) => [...tasks, activeTask!]);
      }
    }
  };

  return (
    <div className={`flex h-full gap-4 overflow-x-scroll ${props.className}`}>
      <DndContext
        id={id}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <TaskBoardColumn
          type="NOT_STARTED"
          tasks={optimisticNotStartedTasks}
          activeTask={activeTask}
        />
        <TaskBoardColumn
          type="IN_PROGRESS"
          tasks={optimisticInProgressTasks}
          activeTask={activeTask}
        />
        <TaskBoardColumn
          type="BLOCKED"
          tasks={optimisticBlockedTasks}
          activeTask={activeTask}
        />
        <TaskBoardColumn
          type="COMPLETED"
          tasks={optimisticCompletedTasks}
          activeTask={activeTask}
        />
        <DragOverlay>
          {activeTask ? <TaskBoardItem task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
