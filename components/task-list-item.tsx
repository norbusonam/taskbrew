"use client";

import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@taskbrew/prisma/db";
import { deleteTask } from "@taskbrew/server-actions/delete-task";
import {
  UpdateTaskBody,
  updateTask,
} from "@taskbrew/server-actions/update-task";
import { useState } from "react";
import toast from "react-hot-toast";
import { DueDatePopover } from "./due-date-popover";
import { DurationMenu } from "./duration-menu";
import { EditableTitle } from "./editable-title";
import {
  IconCheckSquare,
  IconCheckSquareFilled,
  IconDelete,
  IconLoading,
  IconMenu,
  IconMinusSquare,
  IconSquare,
} from "./icons";

const animateLayoutChanges: AnimateLayoutChanges = (args) => {
  const { isSorting, wasDragging } = args;
  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }
  return true;
};

type Props = {
  task: Task;
  className?: string;
};

export function TaskListItem(props: Props) {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [optimisticStatus, setOptimisticStatus] = useState<Task["status"]>(
    props.task.status,
  );
  const [optimisticTitle, setOptimisticTitle] = useState<Task["title"]>(
    props.task.title,
  );
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.task.id,
      animateLayoutChanges,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onUpdateTask = (body: UpdateTaskBody) => {
    toast
      .promise(updateTask(props.task.id, body), {
        loading: "Updating task...",
        success: "Task updated!",
        error: "Failed to update task",
      })
      .catch(() => {
        setOptimisticStatus(props.task.status);
        setOptimisticTitle(props.task.title);
      });
  };

  const onDeleteTask = () => {
    setIsLoadingDelete(true);
    toast
      .promise(deleteTask(props.task.id), {
        loading: "Deleting task...",
        success: "Task deleted!",
        error: "Failed to delete task",
      })
      .catch(() => setIsLoadingDelete(false));
  };

  const onUpdateStatus = () => {
    const newStatus =
      optimisticStatus === "NOT_STARTED"
        ? "IN_PROGRESS"
        : optimisticStatus === "IN_PROGRESS"
        ? "COMPLETED"
        : "NOT_STARTED";
    setOptimisticStatus(newStatus);
    onUpdateTask({ status: newStatus });
  };

  return (
    <div
      id={props.task.id}
      className={`flex cursor-default items-center gap-2 border-b-[1px] border-neutral-200 p-2 dark:border-neutral-800 ${props.className}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <button
        onClick={onUpdateStatus}
        aria-label={`Mark task as ${
          optimisticStatus === "NOT_STARTED"
            ? "in progress"
            : optimisticStatus === "IN_PROGRESS"
            ? "completed"
            : "not started"
        }`}
        className="transition-opacity hover:opacity-75"
      >
        {optimisticStatus === "COMPLETED" ? (
          <IconCheckSquareFilled className="h-5 w-5 text-green-500" />
        ) : optimisticStatus === "IN_PROGRESS" ? (
          <IconMinusSquare className="h-5 w-5 text-blue-500" />
        ) : (
          <IconSquare className="h-5 w-5 text-neutral-500" />
        )}
      </button>
      <div className="w-full space-y-1">
        {/* editable title */}
        <EditableTitle
          title={optimisticTitle}
          onTitleChanged={(title) => {
            setOptimisticTitle(title);
            onUpdateTask({ title });
          }}
        />
        <div className="flex gap-1">
          {/* due date */}
          <DueDatePopover
            dueDate={props.task.dueDate}
            onDueDateChanged={(dueDate) => onUpdateTask({ dueDate })}
          />
          {/* duration */}
          <DurationMenu
            duration={props.task.duration}
            onDurationChanged={(duration) => onUpdateTask({ duration })}
          />
          {/* completed at */}
          {props.task.completedAt && (
            <div className="flex items-center gap-1 px-1 text-sm text-neutral-500">
              <IconCheckSquare className="h-4 w-4" />
              <p>
                Completed at {new Date(props.task.completedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-1">
        <button
          {...listeners}
          aria-label="Reorder task"
          className="rounded-md p-1 text-neutral-500 transition-colors hover:text-neutral-600 active:text-neutral-700 dark:hover:text-neutral-400 dark:active:text-neutral-300"
        >
          <IconMenu className="h-5 w-5" />
        </button>
        {isLoadingDelete ? (
          <div className="p-1">
            <IconLoading className="h-5 w-5 animate-spin text-red-600" />
          </div>
        ) : (
          <button
            onClick={onDeleteTask}
            aria-label="Delete task"
            className="rounded-md p-1 text-red-400 transition-colors  hover:text-red-500 active:text-red-600"
          >
            <IconDelete className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
