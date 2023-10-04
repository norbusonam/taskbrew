import prisma from "@taskbrew/prisma/db";
import { TaskList } from "@taskbrew/components/task-list";
import { getServerSession } from "next-auth";
import { authOptions } from "@taskbrew/app/api/auth/[...nextauth]/route";
import { IconPlus } from "@taskbrew/components/icons";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return null;
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
      // after today
      targetDate: {
        gt: new Date().toISOString().split("T")[0] + "T23:59:59.999Z",
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
