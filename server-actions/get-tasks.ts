"use server";

import { authOptions } from "@taskbrew/app/api/auth/auth-options";
import prisma, { Task } from "@taskbrew/prisma/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getTasksByFilter(filter?: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    redirect("/auth");
  }

  let tasks: Task[] = [];
  if (filter === "completed") {
    tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
        status: "COMPLETED",
      },
      orderBy: {
        completedAt: "desc",
      },
    });
  } else if (filter === "noDueDate") {
    tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
        status: {
          not: "COMPLETED",
        },
        dueDate: null,
      },
      orderBy: {
        listOrder: "asc",
      },
    });
  } else if (filter === "overdue") {
    tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
        status: {
          not: "COMPLETED",
        },
        dueDate: {
          lt: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
      orderBy: {
        listOrder: "asc",
      },
    });
  } else if (filter === "upcoming") {
    tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
        status: {
          not: "COMPLETED",
        },
        dueDate: {
          gt: new Date(),
        },
      },
      orderBy: {
        listOrder: "asc",
      },
    });
  } else {
    // default to due date for all other cases
    tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
        status: {
          not: "COMPLETED",
        },
        dueDate: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
      orderBy: {
        listOrder: "asc",
      },
    });
  }

  return tasks;
}
