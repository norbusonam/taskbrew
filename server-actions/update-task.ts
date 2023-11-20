"use server";

import { authOptions } from "@taskbrew/app/api/auth/auth-options";
import prisma, { Task, TaskStatus } from "@taskbrew/prisma/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { revalidateTaskRoutes } from "./utils/revalidate-task-routes";

export type UpdateTaskBody = {
  title?: Task["title"];
  notes?: Task["notes"];
  status?: Task["status"];
  dueDate?: Task["dueDate"];
  dueDateIncludesTime?: Task["dueDateIncludesTime"];
  isImportant?: Task["isImportant"];
  duration?: Task["duration"];
};

export async function updateTask(id: string, body: UpdateTaskBody) {
  // check session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    redirect("/auth");
  }

  // update task
  await prisma.task.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      title: body.title ? body.title.trim() : undefined,
      notes: body.notes ? body.notes.trim() : undefined,
      status: body.status,
      completedAt:
        // if status is not changed, do not update completedAt
        // if status is changed to COMPLETED, set completedAt to now
        // otherwise, status was changed to NOT_STARTED, or IN_PROGRESS,
        // so set completedAt to null
        body.status === undefined
          ? undefined
          : body.status === TaskStatus.COMPLETED
          ? new Date()
          : null,
      dueDate: body.dueDate,
      dueDateIncludesTime: body.dueDateIncludesTime,
      isImportant: body.isImportant,
      duration: body.duration,
    },
  });

  revalidateTaskRoutes();
}
