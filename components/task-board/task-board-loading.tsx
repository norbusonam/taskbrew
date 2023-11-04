export function TaskBoardLoading() {
  return (
    <div className="flex gap-4 px-4">
      <div className="flex w-full gap-4">
        <div className="flex min-w-[18rem] max-w-[24rem] flex-1 flex-col gap-4">
          <div className="flex h-fit flex-col gap-2 rounded-md bg-neutral-100 p-2 shadow-md dark:bg-neutral-900">
            <div>
              <h2 className="text-lg font-medium">Not started</h2>
              <span className="text-sm text-neutral-500">4 tasks</span>
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <TaskBoardItemLoading key={i} />
            ))}
          </div>
        </div>
        <div className="flex min-w-[18rem] max-w-[24rem] flex-1 flex-col gap-4">
          <div className="flex h-fit flex-col gap-2 rounded-md bg-neutral-100 p-2 shadow-md dark:bg-neutral-900">
            <div>
              <h2 className="text-lg font-medium">In progress</h2>
              <span className="text-sm text-neutral-500">3 tasks</span>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <TaskBoardItemLoading key={i} />
            ))}
          </div>
        </div>
        <div className="flex min-w-[18rem] max-w-[24rem] flex-1 flex-col gap-4">
          <div className="flex h-fit flex-col gap-2 rounded-md bg-neutral-100 p-2 shadow-md dark:bg-neutral-900">
            <div>
              <h2 className="text-lg font-medium">Completed</h2>
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
