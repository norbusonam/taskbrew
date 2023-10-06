"use client";

import { Task } from "@taskbrew/prisma/db";
import { useRouter } from "next/navigation";

type Props = {
  task: Task;
};

export function TaskListItem(props: Props) {
  const router = useRouter();

  const onToggleComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    fetch(`/api/task/${props.task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: e.target.checked ? "COMPLETED" : "NOT_STARTED",
      }),
    }).then((res) => {
      if (res.ok) {
        router.refresh();
      }
    });
  };

  return (
    <button
      key={props.task.id}
      className="flex w-full flex-row items-center gap-2 border-b-[1px] border-gray-200 p-2 transition-all hover:cursor-pointer hover:rounded-md hover:bg-gray-200 active:bg-gray-300"
    >
      <input
        type="checkbox"
        onClick={(e) => e.stopPropagation()}
        checked={props.task.status === "COMPLETED"}
        onChange={onToggleComplete}
      />
      <span>{props.task.title}</span>
    </button>
  );
}
