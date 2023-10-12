"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@taskbrew/prisma/db";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { DueDatePopover } from "./due-date-popover";
import { DurationMenu } from "./duration-menu";
import {
  IconCheckSquare,
  IconDelete,
  IconLoading,
  IconMenu,
  IconMinusSquare,
  IconSquare,
} from "./icons";

type Props = {
  task: Task;
  className?: string;
};

export function TaskListItem(props: Props) {
  const router = useRouter();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const updateTask = (body: {
    title?: Task["title"];
    status?: Task["status"];
    dueDate?: Task["dueDate"];
    duration?: Task["duration"];
  }) => {
    toast.promise(
      fetch(`/api/task/${props.task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => {
        if (res.ok) {
          router.refresh();
        } else {
          throw new Error();
        }
      }),
      {
        loading: "Updating task...",
        success: "Task updated!",
        error: "Failed to update task",
      },
    );
  };

  const deleteTask = () => {
    setIsLoadingDelete(true);
    toast.promise(
      fetch(`/api/task/${props.task.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          router.refresh();
        } else {
          setIsLoadingDelete(false);
          throw new Error();
        }
      }),
      {
        loading: "Deleting task...",
        success: "Task deleted!",
        error: "Failed to delete task",
      },
    );
  };

  const updateStatus = () => {
    updateTask({
      status:
        props.task.status === "NOT_STARTED"
          ? "IN_PROGRESS"
          : props.task.status === "IN_PROGRESS"
          ? "COMPLETED"
          : "NOT_STARTED",
    });
  };

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditingTitle(false);
    if (e.target.value) {
      const title = e.target.value.trim();
      if (title !== props.task.title) {
        updateTask({ title });
      }
    }
  };

  const updateDuration = (duration: Task["duration"]) => {
    if (duration !== props.task.duration) {
      updateTask({ duration });
    }
  };

  const updateDueDate = (dueDate: Task["dueDate"]) => {
    if (dueDate?.getTime() !== props.task.dueDate?.getTime()) {
      updateTask({ dueDate });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      titleInputRef.current?.blur();
    }
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
        onClick={updateStatus}
        aria-label={`Mark task as ${
          props.task.status === "NOT_STARTED"
            ? "in progress"
            : props.task.status === "IN_PROGRESS"
            ? "completed"
            : "not started"
        }`}
        className="transition-opacity hover:opacity-75"
      >
        {props.task.status === "COMPLETED" ? (
          <IconCheckSquare className="h-5 w-5 text-green-500" />
        ) : props.task.status === "IN_PROGRESS" ? (
          <IconMinusSquare className="h-5 w-5 text-yellow-500" />
        ) : (
          <IconSquare className="h-5 w-5 text-neutral-500" />
        )}
      </button>
      <div className="w-full space-y-1">
        {isEditingTitle ? (
          <input
            autoFocus
            ref={titleInputRef}
            type="text"
            className="w-full rounded-md bg-transparent px-1 outline-none"
            onKeyDown={handleKeyDown}
            defaultValue={props.task.title}
            onBlur={updateTitle}
          />
        ) : (
          <button
            style={{ whiteSpace: "pre" }}
            className="overflow-clip rounded-md px-1 text-left transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
            onClick={() => setIsEditingTitle(true)}
          >
            <Markdown>{props.task.title}</Markdown>
          </button>
        )}
        <div className="flex gap-1">
          {/* due date */}
          <DueDatePopover
            dueDate={props.task.dueDate}
            onDueDateClicked={updateDueDate}
          />
          {/* duration */}
          <DurationMenu
            duration={props.task.duration}
            onDurationClicked={updateDuration}
          />
        </div>
      </div>
      <div className="flex gap-1">
        <button
          {...listeners}
          aria-label="Reorder task"
          className="rounded-md p-1 transition-all"
        >
          <IconMenu className="h-5 w-5 text-neutral-500 transition-colors hover:text-neutral-600 active:text-neutral-700 dark:hover:text-neutral-400 dark:active:text-neutral-300" />
        </button>
        {isLoadingDelete ? (
          <div className="p-1">
            <IconLoading className="h-5 w-5 animate-spin text-red-600" />
          </div>
        ) : (
          <button
            onClick={deleteTask}
            aria-label="Delete task"
            className="rounded-md p-1"
          >
            <IconDelete className="h-5 w-5 text-red-400 transition-colors hover:text-red-500 active:text-red-600" />
          </button>
        )}
      </div>
    </div>
  );
}
