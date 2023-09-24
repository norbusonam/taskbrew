import prisma from "@taskbrew/prisma/db";

export default async function Page() {
  const tasks = await prisma.task.findMany();

  return (
    <div>
      {/* task list */}
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex flex-row gap-2 items-center border-b-[0.5px] border-gray-200 p-2 mr-4 hover:bg-gray-200 hover:rounded-md hover:cursor-pointer transition-all active:bg-gray-300"
        >
          <input type="checkbox" checked={task.completed} />
          <span>{task.title}</span>
        </div>
      ))}

      {/* add new task */}
      <div className="flex flex-row gap-2 items-center  border-b-[0.5px] border-gray-200 p-2 mr-4 hover:bg-gray-200 hover:rounded-md hover:cursor-pointer transition-all text-gray-500 active:bg-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <span>New task</span>
      </div>

      {/* no tasks */}
      {tasks.length === 0 && (
        <div className="text-gray-500">No tasks for today</div>
      )}
    </div>
  );
}
