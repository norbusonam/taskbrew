import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@taskbrew/prisma/db";

type Props = {
  task: Task;
  className?: string;
};

export function TaskBoardItem(props: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.task.id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={`rounded-md bg-neutral-200 p-2 dark:bg-neutral-800 ${props.className}`}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <h3>{props.task.title}</h3>
    </div>
  );
}
