import { Task } from "@taskbrew/prisma/db";

type Props = {
  task: Task;
};

export function TaskBoardItem(props: Props) {
  return (
    <div className="rounded-md bg-neutral-200 p-2 dark:bg-neutral-800">
      <h3>{props.task.title}</h3>
    </div>
  );
}
