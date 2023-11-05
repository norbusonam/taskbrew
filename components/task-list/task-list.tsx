"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MeasuringStrategy,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Task } from "@taskbrew/prisma/db";
import { createTask } from "@taskbrew/server-actions/create-task";
import { reorderTasks } from "@taskbrew/server-actions/reorder-tasks";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IconPlus } from "../icons";
import { TaskListItem } from "./task-list-item";

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

type Props = {
  tasks: Task[];
  canCreateNewTask?: boolean;
  className?: string;
};

export function TaskList(props: Props) {
  const [optimisticTasks, setOptimisticTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    setOptimisticTasks(props.tasks);
  }, [props.tasks]);

  const onCreateTask = () => {
    toast.promise(createTask(), {
      loading: "Creating task...",
      success: "Task created!",
      error: "Failed to create task",
    });
  };

  const onDragStart = (e: DragStartEvent) => {
    setActiveTask(optimisticTasks.find((task) => task.id === e.active.id));
  };

  const onDragEnd = (e: DragEndEvent) => {
    setActiveTask(undefined);
    const { active, over } = e;
    if (over && over.id !== active.id) {
      // figure out new order
      const fromIdx = optimisticTasks.findIndex(
        (task) => task.id === active.id,
      );
      const toIdx = optimisticTasks.findIndex((task) => task.id === over.id);
      const reorderedTasks = arrayMove(optimisticTasks, fromIdx, toIdx);

      // optimistically update state
      reorderedTasks.forEach((task, i) => {
        task.listOrder = i;
      });
      setOptimisticTasks(reorderedTasks);

      // make update request w/ new order
      toast
        .promise(
          reorderTasks(
            "LIST",
            reorderedTasks.map((task, i) => ({
              id: task.id,
              order: i,
            })),
          ),
          {
            loading: "Updating task order...",
            success: "Task order updated!",
            error: "Failed to update task order",
          },
        )
        .catch(() => {
          setOptimisticTasks(props.tasks);
        });
    }
  };

  return (
    <div className={props.className}>
      {props.tasks.length === 0 ? (
        <div className="flex items-center justify-center p-5">
          <p className="text-neutral-500">No tasks here yet 😢</p>
        </div>
      ) : (
        <>
          {/* tasks */}
          <DndContext
            measuring={measuringConfig}
            modifiers={[restrictToVerticalAxis]}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <SortableContext items={optimisticTasks.map((task) => task.id)}>
              {optimisticTasks.map((task) => (
                <TaskListItem
                  key={task.id}
                  task={task}
                  className={`${task.id === activeTask?.id ? "opacity-0" : ""}`}
                />
              ))}
              <DragOverlay>
                {activeTask && (
                  <TaskListItem
                    task={activeTask}
                    className="bg-neutral-100 dark:bg-neutral-900"
                  />
                )}
              </DragOverlay>
            </SortableContext>
          </DndContext>
        </>
      )}

      {/* add new task */}
      {props.canCreateNewTask && (
        <button
          onClick={onCreateTask}
          className="flex w-full flex-row items-center gap-3 border-b-[1px] border-neutral-200 p-2 text-neutral-500 transition-colors hover:rounded-md hover:bg-neutral-100 active:rounded-md active:bg-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
        >
          <IconPlus className="h-5 w-5" />
          <span>New task</span>
        </button>
      )}

      {/* whitespace to account for popover and menu */}
      <div className="h-64" />
    </div>
  );
}
