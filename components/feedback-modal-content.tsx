import { FeedbackType } from "@taskbrew/prisma/db";
import { createFeedback } from "@taskbrew/server-actions/create-feedback";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
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
  "flex aspect-square flex-col items-center justify-center gap-1 rounded-md transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700";

export function FeedbackModalContent(props: Props) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const onFeedbackTypeClicked = (type: FeedbackType) => {
    setFeedbackType((prev) => {
      if (prev === type) {
        return null;
      }
      messageRef.current?.focus();
      return type;
    });
  };

  const submitFeedback = () => {
    if (feedbackType) {
      setIsFeedbackLoading(true);
      toast
        .promise(
          createFeedback({
            type: feedbackType,
            message: messageRef.current?.value,
          }),
          {
            loading: "Sending feedback...",
            success: "Feedback sent!",
            error: "Failed to send feedback",
          },
        )
        .then(() => {
          props.closeModal();
        })
        .catch(() => {
          setIsFeedbackLoading(false);
        });
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex gap-4">
        <button
          className={`${sharedButtonClasses} text-green-500`}
          onClick={() => onFeedbackTypeClicked("POSITIVE")}
        >
          {feedbackType === "POSITIVE" ? (
            <IconSmileFilled className="w-1/3" />
          ) : (
            <IconSmile className="w-1/3" />
          )}
          Good
        </button>
        <button
          className={`${sharedButtonClasses} text-red-500`}
          onClick={() => onFeedbackTypeClicked("NEGATIVE")}
        >
          {feedbackType === "NEGATIVE" ? (
            <IconFrownFilled className="w-1/3" />
          ) : (
            <IconFrown className="w-1/3" />
          )}
          Bad
        </button>
        <button
          className={`${sharedButtonClasses} text-yellow-500`}
          onClick={() => onFeedbackTypeClicked("IDEA")}
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
        className="h-24 w-full resize-none rounded-md bg-neutral-200 p-2 outline-none transition-colors placeholder:text-neutral-500 dark:bg-neutral-800"
        aria-label="Feedback message"
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
        className="flex items-center justify-center gap-2 rounded-md bg-neutral-200 p-2 transition-all hover:bg-neutral-300 active:bg-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-600"
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
