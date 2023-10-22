import { Task } from "@taskbrew/prisma/db";
import { HOURS } from "@taskbrew/utils/date";

type Props = {
  startDay: Date;
  endDay: Date;
  tasks: Task[];
  className?: string;
};

export function CalendarDayView(props: Props) {
  const numberOfDays = Math.ceil(
    (props.endDay.getTime() - props.startDay.getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <div className={`flex w-full ${props.className}`}>
      {/* hours column */}
      <div className="pt-16">
        {/* hours */}
        {HOURS.map((hour) => (
          <div
            key={hour}
            className="flex h-16 items-start justify-end px-2 text-xs text-neutral-500"
          >
            {hour}
          </div>
        ))}
      </div>

      {/* day columns */}
      {Array.from({ length: numberOfDays }, (_, i) => {
        const day = new Date(props.startDay);
        day.setDate(day.getDate() + i);
        return (
          <div key={day.getTime()} className="grow">
            {/* header */}
            <div className="flex h-16 flex-col items-center justify-center border-b-[1px] border-l-[1px] border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
              <h2 className="text-lg font-semibold">
                {day.toLocaleDateString(undefined, {
                  weekday: "long",
                })}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {day.toLocaleDateString()}
              </p>
            </div>
            {/* hour chunks */}
            <div className="h-2 border-l-[1px] border-neutral-200 dark:border-neutral-800" />
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="h-16 flex-grow border-l-[1px] border-t-[1px] border-neutral-200 dark:border-neutral-800"
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
