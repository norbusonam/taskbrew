"use client";

import { Task } from "@taskbrew/prisma/db";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Markdown from "react-markdown";
import { DurationButton } from "./duration-button";
import {
  IconCalendar,
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
  const [isHovering, setIsHovering] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const updateTask = (body: {
    title?: Task["title"];
    status?: Task["status"];
    dueDate?: Task["dueDate"];
    duration?: Task["duration"];
  }) => {
    fetch(`/api/task/${props.task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.ok) {
        router.refresh();
      }
    });
  };

  const deleteTask = () => {
    setIsLoadingDelete(true);
    fetch(`/api/task/${props.task.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          router.refresh();
        }
      })
      .finally(() => {
        setIsLoadingDelete(false);
      });
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      titleInputRef.current?.blur();
    }
  };

  return (
    <div
      className="flex items-center gap-2 border-b-[1px] border-gray-200 p-2"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <button
        onClick={updateStatus}
        className="transition-opacity hover:opacity-75"
      >
        <div>
          {props.task.status === "COMPLETED" ? (
            <IconCheckSquare className="h-5 w-5 text-green-500" />
          ) : props.task.status === "IN_PROGRESS" ? (
            <IconMinusSquare className="h-5 w-5 text-yellow-500" />
          ) : (
            <IconSquare className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </button>
      <div className="w-full space-y-1">
        {isEditingTitle ? (
          <input
            autoFocus
            ref={titleInputRef}
            type="text"
            className="w-full rounded-md bg-gray-200 px-1 outline-none"
            onKeyDown={handleKeyDown}
            defaultValue={props.task.title}
            onBlur={updateTitle}
          />
        ) : (
          <button
            style={{ whiteSpace: "pre" }}
            className="overflow-clip rounded-md px-1 text-left transition-colors hover:bg-gray-200 active:bg-gray-300"
            onClick={() => setIsEditingTitle(true)}
          >
            <Markdown>{props.task.title}</Markdown>
          </button>
        )}
        <div className="flex gap-1">
          {/* due date */}
          <button className="flex items-center gap-1 rounded-md px-1 transition-colors hover:bg-gray-200 active:bg-gray-300">
            <IconCalendar className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">
              {props.task.dueDate
                ? new Date(props.task.dueDate).toLocaleDateString()
                : "No due date"}
            </span>
          </button>
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
          className={`rounded-md p-1 ${
            isHovering ? "opacity-100" : "md:opacity-0"
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
