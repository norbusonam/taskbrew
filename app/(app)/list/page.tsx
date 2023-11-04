import { authOptions } from "@taskbrew/app/api/auth/[...nextauth]/route";
import { TaskList } from "@taskbrew/components/task-list";
import prisma from "@taskbrew/prisma/db";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Taskbrew | List",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    redirect("/auth");
  }

  const tasks = await prisma.task.findMany({
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

  return (
    <TaskList
      tasks={tasks}
      canCreateNewTask
      className="overflow-y-scroll px-4 pb-4"
    />
  );
}
