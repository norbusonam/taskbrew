import { useRef, useState } from "react";
import Markdown from "react-markdown";

type Props = {
  text: string;
  onTextChanged: (text: string) => void;
  fadedAppearance?: boolean;
};

export function EditableText(props: Props) {
  const [isEditingText, setIsEditingText] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  const updateText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditingText(false);
    const newText = e.target.value.trim();
    if (newText && newText !== props.text) {
      props.onTextChanged(newText);
    }
  };

  return isEditingText ? (
    <input
      autoFocus
      ref={inputRef}
      type="text"
      className={`w-full rounded-md bg-transparent px-1 outline-none ${
        props.fadedAppearance && "text-neutral-500"
      }`}
      onKeyDown={handleKeyDown}
      defaultValue={props.text}
      onBlur={updateText}
    />
  ) : (
    <button
      className={`rounded-md px-1 text-left transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 ${
        props.fadedAppearance && "text-neutral-500"
      }`}
      onClick={() => setIsEditingText(true)}
    >
      {props.text === "" ? (
        <span className="italic text-neutral-500">Empty</span>
      ) : (
        <Markdown className="line-clamp-1 whitespace-pre-wrap">
          {props.text}
        </Markdown>
      )}
    </button>
  );
}
