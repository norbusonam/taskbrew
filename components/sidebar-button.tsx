type Props = {
  icon: React.ReactNode;
  text: string;
  className?: string;
  active?: boolean;
  onClick?: () => void;
};

export function SidebarButton(props: Props) {
  return (
    <button
      onClick={props.onClick}
      className={`flex w-full flex-row items-center justify-center gap-2 rounded-md p-2 transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 md:justify-start ${
        props.active && "bg-neutral-300 dark:bg-neutral-700"
      } ${props.className}`}
    >
      {props.icon}
      <p className="hidden md:block">{props.text}</p>
    </button>
  );
}
