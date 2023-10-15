import { Task } from "@taskbrew/prisma/db";
import { TaskBoardColumn } from "./task-board-column";

type Props = {
  tasks: Task[];
  className?: string;
};

export function TaskBoard(props: Props) {
  const notStartedTasks = props.tasks.filter(
    (task) => task.status === "NOT_STARTED",
  );
  const inProgressTasks = props.tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  );
  const completedTasks = props.tasks.filter(
    (task) => task.status === "COMPLETED",
  );

  return (
    <div className={`flex gap-4 overflow-x-scroll ${props.className}`}>
      <TaskBoardColumn
        type="NOT_STARTED"
        tasks={notStartedTasks}
        canCreateNewTask
      />
      <TaskBoardColumn type="IN_PROGRESS" tasks={inProgressTasks} />
      <TaskBoardColumn type="COMPLETED" tasks={completedTasks} />
    </div>
  );
}
