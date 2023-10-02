import prisma from "@taskbrew/prisma/db";
import { TaskList } from "@taskbrew/components/task-list";
import { getServerSession } from "next-auth";
import { authOptions } from "@taskbrew/app/api/auth/[...nextauth]/route";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <span>New task</span>
      </div>
    </div>
  );
}
