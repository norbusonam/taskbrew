import { Task } from "@taskbrew/prisma/db";
import { useRef, useState } from "react";
import Markdown from "react-markdown";

type Props = {
  title: Task["title"];
  onTitleChanged: (title: string) => void;
};

export function EditableTitle(props: Props) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      titleInputRef.current?.blur();
    }
  };

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditingTitle(false);
    const newTitle = e.target.value.trim();
    if (newTitle && newTitle !== props.title) {
      props.onTitleChanged(newTitle);
    }
  };

  return isEditingTitle ? (
    <input
      autoFocus
      ref={titleInputRef}
      type="text"
      className="w-full rounded-md bg-transparent px-1 outline-none"
      onKeyDown={handleKeyDown}
      defaultValue={props.title}
      onBlur={updateTitle}
    />
  ) : (
    <button
      className="rounded-md px-1 text-left transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
      onClick={() => setIsEditingTitle(true)}
    >
      <Markdown className="line-clamp-1 whitespace-pre-wrap">
        {props.title}
      </Markdown>
    </button>
  );
}
