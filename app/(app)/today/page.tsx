import prisma from "@taskbrew/prisma/db";
import { TaskList } from "@taskbrew/components/task-list";
import { getServerSession } from "next-auth";
import { authOptions } from "@taskbrew/app/api/auth/[...nextauth]/route";
import { IconPlus } from "@taskbrew/components/icons";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    redirect("/auth");
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
      // beginning of day to end of day
      targetDate: {
        gte: new Date().toISOString().split("T")[0] + "T00:00:00.000Z",
        lte: new Date().toISOString().split("T")[0] + "T23:59:59.999Z",
      },
    },
  });

  return (
    <div>
      {/* task list */}
      <TaskList tasks={tasks} />

      {/* add new task */}
      <div className="mr-4 flex flex-row items-center gap-2 border-b-[1px] border-gray-200 p-2 text-gray-500 transition-all hover:cursor-pointer hover:rounded-md hover:bg-gray-200 active:bg-gray-300">
        <IconPlus className="h-4 w-4" />
        <span>New task</span>
      </div>
    </div>
  );
}
