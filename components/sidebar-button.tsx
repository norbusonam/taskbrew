import { ButtonWithTooltip } from "./button-with-tooltip";

type Props = {
  icon: React.ReactNode;
  text: string;
  hideText?: boolean;
  className?: string;
  active?: boolean;
  onClick?: () => void;
};

export function SidebarButton(props: Props) {
  return (
    <ButtonWithTooltip
      tooltip={props.text}
      offset={{ mainAxis: 24 }}
      placement="right"
      disableTooltip={!props.hideText}
      className={`flex w-full flex-row items-center justify-start gap-2 rounded-md p-2 transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 ${
        props.active && "bg-neutral-200 dark:bg-neutral-800"
      } ${props.hideText && "justify-center"} ${props.className}`}
      onClick={props.onClick}
    >
      {props.icon}
      <p className={`${props.hideText && "hidden"}`}>{props.text}</p>
    </ButtonWithTooltip>
  );
}
