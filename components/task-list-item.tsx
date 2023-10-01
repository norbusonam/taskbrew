"use client";

import { Task } from "@taskbrew/prisma/db";
import { useState } from "react";

type Props = {
  task: Task;
};

export function TaskListItem(props: Props) {
  const [task, setTask] = useState(props.task);

  const onToggleComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    fetch(`/api/task/${props.task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: e.target.checked,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setTask(res);
      });
  };

  return (
    <div
      key={props.task.id}
      className="mr-4 flex flex-row items-center gap-2 border-b-[1px] border-gray-200 p-2 transition-all hover:cursor-pointer hover:rounded-md hover:bg-gray-200 active:bg-gray-300"
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={onToggleComplete}
      />
      <span>{props.task.title}</span>
    </div>
  );
}
