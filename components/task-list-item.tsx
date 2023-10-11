"use client";

import { Task } from "@taskbrew/prisma/db";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { DueDateButton } from "./due-date-button";
import { DurationButton } from "./duration-button";
import {
  IconCheckSquare,
  IconDelete,
  IconLoading,
  IconMinusSquare,
  IconSquare,
} from "./icons";

type Props = {
  task: Task;
};

export function TaskListItem(props: Props) {
  const router = useRouter();
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

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
      updateTask({ title: e.target.value });
    }
  };

  const updateDuration = (duration: Task["duration"]) => {
    updateTask({ duration });
  };

  const updateDueDate = (dueDate: Task["dueDate"]) => {
    updateTask({ dueDate });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      titleInputRef.current?.blur();
    }
  };

  return (
    <div
      className="flex items-center gap-2 border-b-[1px] border-neutral-200 p-2 dark:border-neutral-800"
      onMouseEnter={() => setShowDeleteButton(true)}
      onMouseLeave={() => setShowDeleteButton(false)}
      onFocus={() => setShowDeleteButton(true)}
      onBlur={() => setShowDeleteButton(false)}
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
          <DueDateButton
            dueDate={props.task.dueDate}
            onDueDateClicked={updateDueDate}
          />
          {/* duration */}
          <DurationButton
            duration={props.task.duration}
            onDurationClicked={updateDuration}
          />
        </div>
      </div>
      {!isEditingTitle && (
        <button
          onClick={deleteTask}
          disabled={isLoadingDelete}
          aria-label="Delete task"
          className={`rounded-md p-1 ${
            showDeleteButton ? "opacity-100" : "md:opacity-0"
          } transition-all`}
        >
          {isLoadingDelete ? (
            <IconLoading className="h-5 w-5 animate-spin text-red-600" />
          ) : (
            <IconDelete className="h-5 w-5 text-red-400 transition-colors hover:text-red-500 active:text-red-600" />
          )}
        </button>
      )}
    </div>
  );
}
