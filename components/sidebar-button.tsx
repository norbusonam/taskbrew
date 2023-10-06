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
      className={`flex w-full flex-row items-center justify-center gap-2 rounded-md p-2 transition-colors hover:bg-gray-300 active:bg-gray-400 md:justify-start ${
        props.active && "bg-gray-300"
      } ${props.className}`}
    >
      {props.icon}
      <p className="hidden md:block">{props.text}</p>
    </button>
  );
}
