import { FeedbackType } from "@prisma/client";
import { useRef, useState } from "react";
import {
  IconBulb,
  IconBulbFilled,
  IconFrown,
  IconFrownFilled,
  IconLoading,
  IconSend,
  IconSmile,
  IconSmileFilled,
} from "./icons";

type Props = {
  closeModal: () => void;
};

const sharedButtonClasses =
  "flex aspect-square flex-col items-center justify-center gap-1 rounded-md text-green-600 transition-colors hover:bg-gray-200 active:bg-gray-300";

export function FeedbackModalContent(props: Props) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const submitFeedback = () => {
    setIsFeedbackLoading(true);
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({
        type: feedbackType,
        message: messageRef.current?.value,
      }),
    })
      .then((res) => {
        if (res.ok) {
          props.closeModal();
        }
      })
      .catch(() => setIsFeedbackLoading(false));
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <button
          className={`${sharedButtonClasses} text-green-600`}
          onClick={() =>
            setFeedbackType((prev) => (prev === "POSITIVE" ? null : "POSITIVE"))
          }
        >
          {feedbackType === "POSITIVE" ? (
            <IconSmileFilled className="w-1/3" />
          ) : (
            <IconSmile className="w-1/3" />
          )}
          Good
        </button>
        <button
          className={`${sharedButtonClasses} text-red-600`}
          onClick={() =>
            setFeedbackType((prev) => (prev === "NEGATIVE" ? null : "NEGATIVE"))
          }
        >
          {feedbackType === "NEGATIVE" ? (
            <IconFrownFilled className="w-1/3" />
          ) : (
            <IconFrown className="w-1/3" />
          )}
          Bad
        </button>
        <button
          className={`${sharedButtonClasses} text-yellow-600`}
          onClick={() =>
            setFeedbackType((prev) => (prev === "IDEA" ? null : "IDEA"))
          }
        >
          {feedbackType === "IDEA" ? (
            <IconBulbFilled className="w-1/3" />
          ) : (
            <IconBulb className="w-1/3" />
          )}
          Idea
        </button>
      </div>
      <textarea
        className="h-24 w-full resize-none rounded-md bg-gray-100 p-2 outline-none transition-colors focus:bg-gray-200"
        placeholder={
          feedbackType === "POSITIVE"
            ? "What did you like?"
            : feedbackType === "NEGATIVE"
            ? "What did you not like?"
            : feedbackType === "IDEA"
            ? "What is your idea?"
            : "What do you want to tell us?"
        }
        ref={messageRef}
      />
      <button
        disabled={!feedbackType || isFeedbackLoading}
        onClick={submitFeedback}
        className="flex items-center justify-center gap-2 rounded-md bg-gray-200 p-2 text-gray-800 transition-all hover:bg-gray-300 active:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Send feedback
        {isFeedbackLoading ? (
          <IconLoading className="h-5 w-5 animate-spin" />
        ) : (
          <IconSend className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
