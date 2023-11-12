import { ButtonWithTooltip } from "./button-with-tooltip";
import { IconFlag, IconFlagFilled } from "./icons";

type Props = {
  isImportant: boolean;
  onIsImportantChanged: (isImportant: boolean) => void;
};

export function ImportantToggle(props: Props) {
  return (
    <ButtonWithTooltip
      tooltip={props.isImportant ? "Flagged" : "Not flagged"}
      placement="top-start"
      className="flex items-center rounded-md px-1 transition-colors hover:bg-neutral-200 active:bg-neutral-300  dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
      onClick={() => props.onIsImportantChanged(!props.isImportant)}
    >
      {props.isImportant ? (
        <IconFlagFilled className="h-4 w-4 text-yellow-500" />
      ) : (
        <IconFlag className="h-4 w-4 text-neutral-500" />
      )}
    </ButtonWithTooltip>
  );
}
