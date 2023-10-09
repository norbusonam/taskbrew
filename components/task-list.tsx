"use client";

import { Task } from "@taskbrew/prisma/db";
import { useRouter } from "next/navigation";
import { IconPlus } from "./icons";
import { TaskListItem } from "./task-list-item";

type Props = {
  tasks: Task[];
  canCreateNewTask?: boolean;
};

export function TaskList(props: Props) {
  const router = useRouter();

  const createTask = () => {
    fetch(`/api/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((res) => {
      if (res.ok) {
        router.refresh();
      }
    });
  };

  return (
    <div>
      {/* tasks */}
      {props.tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}

      {/* add new task */}
      {props.canCreateNewTask && (
        <button
          onClick={createTask}
          className="flex  w-full flex-row items-center gap-3 border-b-[1px] border-gray-200 p-2 text-gray-500 transition-all hover:cursor-pointer hover:rounded-md hover:bg-gray-200 active:bg-gray-300"
        >
          <IconPlus className="h-5 w-5" />
          <span>New task</span>
        </button>
      )}
    </div>
  );
}
