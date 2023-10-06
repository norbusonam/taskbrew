"use client";

import { IconPlus } from "./icons";
import { TaskListItem } from "./task-list-item";
import { Task } from "@taskbrew/prisma/db";

type Props = {
  tasks: Task[];
  canCreateNewTask?: boolean;
};

export function TaskList(props: Props) {
  return (
    <div className="mr-4">
      {/* tasks */}
      {props.tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}

      {/* add new task */}
      {props.canCreateNewTask && (
        <button className="w-full flex flex-row items-center gap-2 border-b-[1px] border-gray-200 p-2 text-gray-500 transition-all hover:cursor-pointer hover:rounded-md hover:bg-gray-200 active:bg-gray-300">
          <IconPlus className="h-4 w-4" />
          <span>New task</span>
        </button>
      )}
    </div>
  );
}
