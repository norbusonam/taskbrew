"use client";

import { Task } from "@taskbrew/prisma/db";
import { TaskListItem } from "./task-list-item";

type Props = {
  tasks: Task[];
};

export function TaskList(props: Props) {
  return props.tasks.map((task) => <TaskListItem key={task.id} task={task} />);
}
