import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { Task } from "@taskbrew/prisma/db";
import { createTask } from "@taskbrew/server-actions/create-task";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { IconPlus } from "../icons";
import { TaskBoardItem } from "./task-board-item";

type Props = {
  type: Task["status"];
  tasks: Task[];
  activeTask?: Task;
};

export function TaskBoardColumn(props: Props) {
  const { setNodeRef } = useDroppable({
    id: props.type,
  });
  const taskIds = useMemo(
    () => props.tasks.map((task) => task.id),
    [props.tasks],
  );

  const onCreateTask = () => {
    toast.promise(createTask(), {
      loading: "Creating task...",
      success: "Task created!",
      error: "Failed to create task",
    });
  };

  return (
    <div className="flex h-fit max-h-full min-w-[18rem] max-w-[24rem] flex-1 flex-col justify-between rounded-md bg-neutral-100 shadow-md dark:bg-neutral-900">
      <div className="p-2">
        <h2 className="text-lg font-medium">
          {props.type === "NOT_STARTED"
            ? "🗄️\u00a0\u00a0Not started"
            : props.type === "IN_PROGRESS"
            ? "🚧\u00a0\u00a0In progress"
            : "✅\u00a0\u00a0Completed"}
        </h2>
        <span className="text-sm text-neutral-500">
          {props.tasks.length} {props.tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>
      <div className="space-y-2 overflow-y-scroll p-2">
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
        <div className="p-2">
          <button
            onClick={onCreateTask}
            className="flex w-full flex-row items-center gap-2 rounded-md p-2 text-neutral-500 transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
          >
            <IconPlus className="h-5 w-5" />
            <span>New task</span>
          </button>
        </div>
      )}
    </div>
  );
}
