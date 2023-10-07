const widths = ["w-64", "w-60", "w-72", "w-60", "w-80", "w-64"];

export function TaskListLoading() {
  return (
    <div>
      {widths.map((width, i) => (
        <div
          key={i}
          className="mr-4 flex flex-row items-center gap-2 border-b-[1px] border-gray-200 p-2"
        >
          <div className="h-5 w-5 animate-pulse rounded-md bg-gray-300"></div>
          <div className="w-full space-y-2">
            <div
              className={`h-5 ${width} max-w-full animate-pulse rounded-md bg-gray-300`}
            ></div>
            <div className="flex gap-1">
              <div className="h-5 w-24 animate-pulse rounded-md bg-gray-300"></div>
              <div className="h-5 w-24 animate-pulse rounded-md bg-gray-300"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
