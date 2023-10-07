"use client";

import { Task } from "@taskbrew/prisma/db";
import { useRouter } from "next/navigation";
import { IconCheckSquare, IconMinusSquare, IconSquare } from "./icons";

type Props = {
  task: Task;
};

export function TaskListItem(props: Props) {
  const router = useRouter();

  const updateStatus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    fetch(`/api/task/${props.task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status:
          props.task.status === "NOT_STARTED"
            ? "IN_PROGRESS"
            : props.task.status === "IN_PROGRESS"
            ? "COMPLETED"
            : "NOT_STARTED",
      }),
    }).then((res) => {
      if (res.ok) {
        router.refresh();
      }
    });
  };

  return (
    <div className="flex items-center gap-2 border-b-[1px] border-gray-200 p-2 transition-colors hover:cursor-pointer hover:rounded-md hover:bg-gray-200 active:bg-gray-300">
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
      <p>{props.task.title}</p>
    </div>
  );
}
