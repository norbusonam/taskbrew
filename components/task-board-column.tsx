"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Task } from "@taskbrew/prisma/db";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { IconPlus } from "./icons";
import { TaskBoardItem } from "./task-board-item";

type Props = {
  type: Task["status"];
  tasks: Task[];
  activeTask?: Task;
};

export function TaskBoardColumn(props: Props) {
  const router = useRouter();
  const { setNodeRef } = useDroppable({
    id: props.type,
  });
  const taskIds = useMemo(
    () => props.tasks.map((task) => task.id),
    [props.tasks],
  );

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
    <div className="flex h-fit min-w-[18rem] max-w-[24rem] flex-1 flex-col justify-between gap-2 rounded-md bg-neutral-100 p-2 shadow-md dark:bg-neutral-900">
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="text-lg font-medium">
            {props.type === "NOT_STARTED"
              ? "Not started"
              : props.type === "IN_PROGRESS"
              ? "In progress"
              : "Completed"}
          </h2>
          <span className="text-sm text-neutral-500">
            {props.tasks.length} tasks
          </span>
        </div>
        <SortableContext items={taskIds}>
          {props.tasks.length > 0 ? (
            props.tasks.map((task) => (
              <TaskBoardItem
                key={task.id}
                task={task}
                className={props.activeTask?.id === task.id ? "opacity-40" : ""}
              />
            ))
          ) : (
            <div ref={setNodeRef} className="h-16 w-full bg-transparent" />
          )}
        </SortableContext>
      </div>
      {props.type === "NOT_STARTED" && (
        <button
          onClick={createTask}
          className="flex w-full flex-row items-center gap-2 rounded-md p-2 text-neutral-500 transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
        >
          <IconPlus className="h-5 w-5" />
          <span>New task</span>
        </button>
      )}
    </div>
  );
}
