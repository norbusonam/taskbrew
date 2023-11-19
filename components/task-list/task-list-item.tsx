import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Transition } from "@headlessui/react";
import { Task } from "@taskbrew/prisma/db";
import { deleteTask } from "@taskbrew/server-actions/delete-task";
import {
  UpdateTaskBody,
  updateTask,
} from "@taskbrew/server-actions/update-task";
import { useState } from "react";
import toast from "react-hot-toast";
import { DueDatePopover } from "../due-date-popover";
import { DurationMenu } from "../duration-menu";
import { EditableText } from "../editable-text";
import {
  IconCheckSquare,
  IconDelete,
  IconExpandAlt,
  IconLoading,
  IconMenu,
} from "../icons";
import { ImportantToggle } from "../important-toggle";
import { StatusButton } from "../status-button";

const animateLayoutChanges: AnimateLayoutChanges = (args) => {
  const { isSorting, wasDragging } = args;
  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }
  return true;
};

type Props = {
  task: Task;
  onShowDetails?: (task: Task) => void;
  isDragOverlay?: boolean;
  className?: string;
};

export function TaskListItem(props: Props) {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isTaskActive, setIsTaskActive] = useState(
    props.isDragOverlay ?? false,
  );
  const [optimisticTask, setOptimisticTask] = useState(props.task);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.task.id,
      animateLayoutChanges,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onUpdateTask = (body: UpdateTaskBody) => {
    toast
      .promise(updateTask(props.task.id, body), {
        loading: "Updating task...",
        success: "Task updated!",
        error: "Failed to update task",
      })
      .catch(() => {
        setOptimisticTask(props.task);
      });
  };

  const onDeleteTask = () => {
    setIsLoadingDelete(true);
    toast
      .promise(deleteTask(props.task.id), {
        loading: "Deleting task...",
        success: "Task deleted!",
        error: "Failed to delete task",
      })
      .catch(() => setIsLoadingDelete(false));
  };

  return (
    <div
      id={props.task.id}
      className={`flex cursor-default items-center gap-2 border-b-[1px] border-neutral-200 p-2 dark:border-neutral-800 ${props.className}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      onMouseEnter={() => setIsTaskActive(true)}
      onMouseLeave={() => setIsTaskActive(false)}
      onFocus={() => setIsTaskActive(true)}
      onBlur={() => setIsTaskActive(false)}
    >
      <StatusButton
        status={optimisticTask.status}
        onStatusChange={(status) => {
          setOptimisticTask((prev) => ({ ...prev, status }));
          onUpdateTask({ status });
        }}
      />
      <div className="w-full space-y-1">
        {/* editable title */}
        <EditableText
          text={optimisticTask.title}
          fadedAppearance={optimisticTask.status === "COMPLETED"}
          onTextChanged={(title) => {
            setOptimisticTask((prev) => ({ ...prev, title }));
            onUpdateTask({ title });
          }}
        />
        <div className="flex gap-1">
          {/* due date */}
          <DueDatePopover
            dueDate={optimisticTask.dueDate}
            dueDateIncludesTime={optimisticTask.dueDateIncludesTime}
            onDueDateChanged={(dueDate) => {
              setOptimisticTask((prev) => ({ ...prev, dueDate }));
              onUpdateTask({ dueDate });
            }}
            onDueDateIncludesTimeChanged={(dueDateIncludesTime) => {
              setOptimisticTask((prev) => ({ ...prev, dueDateIncludesTime }));
              onUpdateTask({ dueDateIncludesTime });
            }}
            fadedAppearance={optimisticTask.status === "COMPLETED"}
          />
          {/* duration */}
          <DurationMenu
            duration={optimisticTask.duration}
            onDurationChanged={(duration) => {
              setOptimisticTask((prev) => ({ ...prev, duration }));
              onUpdateTask({ duration });
            }}
          />
          {/* important */}
          <ImportantToggle
            isImportant={optimisticTask.isImportant}
            onIsImportantChanged={(isImportant) => {
              setOptimisticTask((prev) => ({ ...prev, isImportant }));
              onUpdateTask({ isImportant });
            }}
          />
          {/* completed at */}
          {props.task.completedAt && (
            <div className="flex items-center gap-1 px-1 text-sm text-neutral-500">
              <IconCheckSquare className="h-4 w-4" />
              <p>
                Completed at {new Date(props.task.completedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
      <Transition
        show={isTaskActive}
        enter="transition-opacity"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex gap-1">
          <button
            onClick={() => props.onShowDetails?.(props.task)}
            className="rounded-md p-1 text-neutral-500 transition-colors hover:text-neutral-600 active:text-neutral-700 dark:hover:text-neutral-400 dark:active:text-neutral-300"
          >
            <IconExpandAlt className="h-5 w-5" />
          </button>
          {props.task.status !== "COMPLETED" && (
            <button
              {...listeners}
              aria-label="Reorder task"
              className="rounded-md p-1 text-neutral-500 transition-colors hover:text-neutral-600 active:text-neutral-700 dark:hover:text-neutral-400 dark:active:text-neutral-300"
            >
              <IconMenu className="h-5 w-5" />
            </button>
          )}
          {isLoadingDelete ? (
            <div className="p-1">
              <IconLoading className="h-5 w-5 animate-spin text-red-600" />
            </div>
          ) : (
            <button
              onClick={onDeleteTask}
              aria-label="Delete task"
              className="rounded-md p-1 text-red-400 transition-colors  hover:text-red-500 active:text-red-600"
            >
              <IconDelete className="h-5 w-5" />
            </button>
          )}
        </div>
      </Transition>
    </div>
  );
}
