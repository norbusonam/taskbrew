const POSSIBLE_WIDTHS = ["w-4/12", "w-5/12", "w-6/12", "w-7/12", "w-8/12"];

type Props = {
  count: number;
};

const makeRandomWidths = (count: number) => {
  const widths = [];
  for (let i = 0; i < count; i++) {
    widths.push(
      POSSIBLE_WIDTHS[Math.floor(Math.random() * POSSIBLE_WIDTHS.length)],
    );
  }
  return widths;
};

export function TaskListLoading(props: Props) {
  const widths = makeRandomWidths(props.count);

  return (
    <div>
      {widths.map((width, i) => (
        <div
          key={i}
          className="mr-4 flex flex-row items-center gap-2 border-b-[1px] border-gray-200 px-2 py-[0.75rem]"
        >
          <div className="h-4 w-4 animate-pulse rounded-md bg-gray-300"></div>
          <span
            className={`h-4 ${width} animate-pulse rounded-md bg-gray-300`}
          ></span>
        </div>
      ))}
    </div>
  );
}
