import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@taskbrew/prisma/db";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { DueDatePopover } from "./due-date-popover";
import { DurationMenu } from "./duration-menu";
import { EditableTitle } from "./editable-title";
import { IconHolder } from "./icons";

type Props = {
  task: Task;
  className?: string;
};

export function TaskBoardItem(props: Props) {
  const router = useRouter();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.task.id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const updateTask = (body: {
    title?: Task["title"];
    status?: Task["status"];
    dueDate?: Task["dueDate"];
    duration?: Task["duration"];
  }) => {
    toast.promise(
      fetch(`/api/task/${props.task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).then((res) => {
        if (res.ok) {
          if (body.status === "COMPLETED") {
            setTimeout(() => {
              router.refresh();
            }, 3000);
          } else {
            router.refresh();
          }
        } else {
          throw new Error();
        }
      }),
      {
        loading: "Updating task...",
        success: "Task updated!",
        error: "Failed to update task",
      },
    );
  };

  const updateDuration = (duration: Task["duration"]) => {
    if (duration !== props.task.duration) {
      updateTask({ duration });
    }
  };

  const updateDueDate = (dueDate: Task["dueDate"]) => {
    if (dueDate?.getTime() !== props.task.dueDate?.getTime()) {
      updateTask({ dueDate });
    }
  };

  return (
    <div
      className={`cursor-default space-y-1 rounded-md bg-neutral-50 p-2 shadow-md dark:bg-neutral-950 ${props.className}`}
      style={style}
      ref={setNodeRef}
      {...attributes}
    >
      <div className="flex items-center justify-between">
        <EditableTitle
          title={props.task.title}
          onTitleChanged={(title) => updateTask({ title })}
        />
        <button
          {...listeners}
          className="rounded-md p-1 transition-colors hover:bg-neutral-300 dark:hover:bg-neutral-700"
        >
          <IconHolder className="h-3 w-3" />
        </button>
      </div>
      <div className="flex gap-1">
        <DueDatePopover
          dueDate={props.task.dueDate}
          onDueDateClicked={updateDueDate}
        />
        <DurationMenu
          duration={props.task.duration}
          onDurationClicked={updateDuration}
        />
      </div>
    </div>
  );
}
