import { useRef, useState } from "react";

type Props = {
  text: string;
  onTextChanged: (text: string) => void;
  placeholder?: string;
  isTextArea?: boolean;
  fadedAppearance?: boolean;
  className?: string;
  canBeEmpty?: boolean;
  shouldTrimText?: boolean;
};

export function EditableText(props: Props) {
  const [isEditingText, setIsEditingText] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  const updateText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsEditingText(false);
    const newText = props.shouldTrimText
      ? e.target.value.trim()
      : e.target.value;
    // update if text exists
    if (!props.canBeEmpty && newText === "") return;
    if (newText === props.text) return;
    props.onTextChanged(newText);
  };

  return isEditingText ? (
    props.isTextArea ? (
      <textarea
        autoFocus
        ref={textareaRef}
        onFocus={(e) => {
          e.target.select();
        }}
        placeholder={props.placeholder}
        className={`w-full rounded-md bg-transparent px-1 outline-none ${
          props.fadedAppearance && "text-neutral-500"
        } ${props.className}`}
        onKeyDown={handleKeyDown}
        defaultValue={props.text}
        onBlur={updateText}
      />
    ) : (
      <input
        autoFocus
        ref={inputRef}
        onFocus={(e) => {
          e.target.select();
        }}
        placeholder={props.placeholder}
        type="text"
        className={`w-full rounded-md bg-transparent px-1 outline-none ${
          props.fadedAppearance && "text-neutral-500"
        } ${props.className}`}
        onKeyDown={handleKeyDown}
        defaultValue={props.text}
        onBlur={updateText}
      />
    )
  ) : (
    <button
      // pot text on top
      className={`flex overflow-scroll rounded-md px-1 text-left transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 ${
        props.fadedAppearance && "text-neutral-500"
      } ${props.className}`}
      onClick={() => setIsEditingText(true)}
    >
      {props.text === "" ? (
        <span className="italic text-neutral-500">Empty</span>
      ) : (
        <p
          className={props.isTextArea ? "whitespace-pre-wrap" : "line-clamp-1"}
        >
          {props.text}
        </p>
      )}
    </button>
  );
}
