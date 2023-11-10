import { IconPlus } from "../icons";

export function TaskBoardLoading() {
  return (
    <div className="flex gap-4 px-4">
      <div className="flex w-full gap-4">
        <div className="flex min-w-[18rem] max-w-[24rem] flex-1 flex-col gap-4">
          <div className="flex h-fit flex-col gap-2 rounded-md bg-neutral-100 p-2 shadow-md dark:bg-neutral-900">
            <div className="pb-2">
              <h2 className="text-lg font-medium">🗄️&nbsp;&nbsp;Not started</h2>
              <span className="text-sm text-neutral-500">4 tasks</span>
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <TaskBoardItemLoading key={i} />
            ))}
            <button className="flex w-full flex-row items-center gap-2 rounded-md p-2 text-neutral-500 transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:active:bg-neutral-700">
              <IconPlus className="h-5 w-5" />
              <span>New task</span>
            </button>
          </div>
        </div>
        <div className="flex min-w-[18rem] max-w-[24rem] flex-1 flex-col gap-4">
          <div className="flex h-fit flex-col gap-2 rounded-md bg-neutral-100 p-2 shadow-md dark:bg-neutral-900">
            <div className="pb-2">
              <h2 className="text-lg font-medium">🚧&nbsp;&nbsp;In progress</h2>
              <span className="text-sm text-neutral-500">3 tasks</span>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <TaskBoardItemLoading key={i} />
            ))}
          </div>
        </div>
        <div className="flex min-w-[18rem] max-w-[24rem] flex-1 flex-col gap-4">
          <div className="flex h-fit flex-col gap-2 rounded-md bg-neutral-100 p-2 shadow-md dark:bg-neutral-900">
            <div className="pb-2">
              <h2 className="text-lg font-medium">🛑&nbsp;&nbsp;Blocked</h2>
              <span className="text-sm text-neutral-500">4 tasks</span>
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <TaskBoardItemLoading key={i} />
            ))}
          </div>
        </div>
        <div className="flex min-w-[18rem] max-w-[24rem] flex-1 flex-col gap-4">
          <div className="flex h-fit flex-col gap-2 rounded-md bg-neutral-100 p-2 shadow-md dark:bg-neutral-900">
            <div className="pb-2">
              <h2 className="text-lg font-medium">✅&nbsp;&nbsp;Completed</h2>
              <span className="text-sm text-neutral-500">5 tasks</span>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <TaskBoardItemLoading key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskBoardItemLoading() {
  return (
    <div className="h-16 animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-700" />
  );
}
