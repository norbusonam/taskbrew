import { TaskStatus } from "@taskbrew/prisma/db";
import { ButtonWithTooltip } from "./button-with-tooltip";
import { IconCheckSquareFilled, IconMinusSquare, IconSquare } from "./icons";

type Props = {
  status: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
};

export function StatusButton(props: Props) {
  return (
    <ButtonWithTooltip
      onClick={() =>
        props.onStatusChange(
          props.status === "NOT_STARTED"
            ? "IN_PROGRESS"
            : props.status === "IN_PROGRESS"
            ? "COMPLETED"
            : "NOT_STARTED",
        )
      }
      className="transition-opacity hover:opacity-75"
      placement="top-start"
      tooltip={
        props.status === "NOT_STARTED"
          ? "Not started"
          : props.status === "IN_PROGRESS"
          ? "In progress"
          : props.status === "BLOCKED"
          ? "Blocked"
          : "Completed"
      }
    >
      {props.status === "COMPLETED" ? (
        <IconCheckSquareFilled className="h-5 w-5 text-green-500" />
      ) : props.status === "IN_PROGRESS" ? (
        <IconMinusSquare className="h-5 w-5 text-blue-500" />
      ) : props.status === "BLOCKED" ? (
        <IconMinusSquare className="h-5 w-5 text-red-500" />
      ) : (
        <IconSquare className="h-5 w-5 text-neutral-500" />
      )}
    </ButtonWithTooltip>
  );
}
