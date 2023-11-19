import { Task } from "@taskbrew/prisma/db";

type Props = {
  task: Task;
};

export function TaskModalContent(props: Props) {
  return (
    <div>
      <p>{props.task.title}</p>
      <p>{props.task.status}</p>
      <p>{props.task.notes}</p>
    </div>
  );
}
