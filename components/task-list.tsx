"use client";

import { Task } from "@taskbrew/prisma/db";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IconPlus } from "./icons";
import { TaskListItem } from "./task-list-item";

type Props = {
  tasks: Task[];
  canCreateNewTask?: boolean;
};

export function TaskList(props: Props) {
  const router = useRouter();

  const createTask = () => {
    toast.promise(
      fetch(`/api/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }).then((res) => {
        if (res.ok) {
          router.refresh();
        } else {
          throw new Error();
        }
      }),
      {
        loading: "Creating task...",
        success: "Task created!",
        error: "Failed to create task",
      },
    );
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
          className="flex w-full flex-row items-center gap-3 border-b-[1px] border-neutral-200 p-2 text-neutral-500 transition-colors hover:cursor-pointer hover:rounded-md hover:bg-neutral-100 active:bg-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
        >
          <IconPlus className="h-5 w-5" />
          <span>New task</span>
        </button>
      )}
    </div>
  );
}
