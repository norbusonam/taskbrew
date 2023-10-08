const widths = [
  "basis-64",
  "basis-60",
  "basis-72",
  "basis-60",
  "basis-80",
  "basis-64",
];

export function TaskListLoading() {
  return (
    <div>
      {widths.map((width, i) => (
        <div
          key={i}
          className="flex flex-row items-center gap-2 border-b-[1px] border-gray-200 p-2"
        >
          <div className="h-5 w-5 shrink-0 animate-pulse rounded-md bg-gray-300" />
          <div className="basis-full space-y-2">
            <div className="flex">
              <div
                className={`h-5 ${width} animate-pulse rounded-md bg-gray-300`}
              />
            </div>
            <div className="flex gap-1">
              <div className="h-5 basis-24 animate-pulse rounded-md bg-gray-300" />
              <div className="h-5 basis-24 animate-pulse rounded-md bg-gray-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
