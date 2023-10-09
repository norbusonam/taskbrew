import { Task } from "@taskbrew/prisma/db";
import { useRef } from "react";
import { IconCalendar } from "./icons";

type Props = {
  dueDate: Task["dueDate"];
  onDueDateClicked: (dueDate: Task["dueDate"]) => void;
};

export function DueDateButton(props: Props) {
  const dateRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <button
        className="flex items-center gap-1 rounded-md px-1 transition-colors hover:bg-gray-200 active:bg-gray-300"
        onClick={() => dateRef.current?.showPicker()}
      >
        <IconCalendar className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          {props.dueDate
            ? new Date(props.dueDate).toLocaleDateString()
            : "No due date"}
        </span>
      </button>
    </div>
  );
}
