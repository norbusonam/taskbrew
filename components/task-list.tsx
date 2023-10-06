"use client";

import { TaskListItem } from "./task-list-item";
import { Task } from "@taskbrew/prisma/db";

type Props = {
  tasks: Task[];
};

export function TaskList(props: Props) {
  return props.tasks.map((task) => <TaskListItem key={task.id} task={task} />);
}
