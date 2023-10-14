import { authOptions } from "@taskbrew/app/api/auth/[...nextauth]/route";
import { TaskBoard } from "@taskbrew/components/task-board";
import prisma from "@taskbrew/prisma/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    redirect("/auth");
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return <TaskBoard tasks={tasks} />;
}
