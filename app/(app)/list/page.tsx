import { authOptions } from "@taskbrew/app/api/auth/[...nextauth]/route";
import { TaskList } from "@taskbrew/components/task-list";
import prisma, { Task } from "@taskbrew/prisma/db";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Taskbrew | List",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    redirect("/auth");
  }

  let tasks: Task[] = [];
  if (searchParams?.filter === "completed") {
    tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
        status: "COMPLETED",
      },
      orderBy: {
        completedAt: "desc",
      },
    });
  } else if (searchParams?.filter === "all") {
    tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
        status: {
          not: "COMPLETED",
        },
      },
      orderBy: {
        listOrder: "asc",
      },
    });
  } else if (searchParams?.filter === "overdue") {
    tasks = await prisma.task.findMany({
      where: {
        userId: session.user.id,
        status: {
          not: "COMPLETED",
        },
        dueDate: {
          lt: new Date(),
        },
      },
      orderBy: {
        listOrder: "asc",
      },
    });
  } else if (searchParams?.filter === "upcoming") {
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
    // no filter is equivalent to today
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

  return (
    <TaskList
      tasks={tasks}
      canCreateNewTask={
        searchParams?.filter === "all" ||
        searchParams?.filter === "upcoming" ||
        searchParams?.filter === undefined
      }
      noTasksMessage={
        searchParams?.filter === "completed"
          ? "No completed tasks 😢"
          : searchParams?.filter === "overdue"
          ? "No overdue tasks 😎"
          : searchParams?.filter === "upcoming"
          ? "No upcoming tasks 🏝️"
          : searchParams?.filter === "all"
          ? "No tasks 😢"
          : "No tasks due today 👍"
      }
      defaultValuesForNewTask={
        searchParams?.filter === "upcoming"
          ? {
              // next day
              dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            }
          : searchParams?.filter === undefined
          ? { dueDate: new Date() }
          : undefined
      }
      className="overflow-y-scroll px-4 pb-4"
    />
  );
}
