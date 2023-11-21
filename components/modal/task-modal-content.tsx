import { Task } from "@taskbrew/prisma/db";
import {
  UpdateTaskBody,
  updateTask,
} from "@taskbrew/server-actions/update-task";
import { useState } from "react";
import toast from "react-hot-toast";
import { EditableText } from "../editable-text";
import { ImportantToggle } from "../important-toggle";

type Props = {
  task: Task;
};

export function TaskModalContent(props: Props) {
  const [optimisticTask, setOptimisticTask] = useState(props.task);

  const onUpdateTask = (body: UpdateTaskBody) => {
    toast
      .promise(updateTask(props.task.id, body), {
        loading: "Updating task...",
        success: "Task updated!",
        error: "Failed to update task",
      })
      .catch(() => {
        setOptimisticTask(props.task);
      });
  };

  return (
    <div className="space-y-2 pt-2">
      <div className="flex gap-2">
        <EditableText
          text={optimisticTask.title}
          placeholder="Title"
          onTextChanged={(title) => {
            setOptimisticTask((prev) => ({ ...prev, title }));
            onUpdateTask({ title });
          }}
          className="w-full text-3xl"
        />
        <ImportantToggle
          isImportant={optimisticTask.isImportant}
          onIsImportantChanged={(isImportant) => {
            setOptimisticTask((prev) => ({ ...prev, isImportant }));
            onUpdateTask({ isImportant });
          }}
        />
      </div>
      <EditableText
        text={optimisticTask.notes}
        placeholder="Notes"
        onTextChanged={(notes) => {
          setOptimisticTask((prev) => ({ ...prev, notes }));
          onUpdateTask({ notes });
        }}
        className="h-32 w-full resize-none justify-start align-top"
        isTextArea
        canBeEmpty
      />
    </div>
  );
}
