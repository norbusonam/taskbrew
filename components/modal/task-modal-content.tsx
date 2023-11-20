import { Task } from "@taskbrew/prisma/db";
import {
  UpdateTaskBody,
  updateTask,
} from "@taskbrew/server-actions/update-task";
import { useState } from "react";
import toast from "react-hot-toast";
import { EditableText } from "../editable-text";

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
    <div>
      <EditableText
        text={optimisticTask.title}
        onTextChanged={(title) => {
          setOptimisticTask((prev) => ({ ...prev, title }));
          onUpdateTask({ title });
        }}
      />
      <EditableText
        text={optimisticTask.notes}
        onTextChanged={(notes) => {
          setOptimisticTask((prev) => ({ ...prev, notes }));
          onUpdateTask({ notes });
        }}
        isTextArea
      />
    </div>
  );
}
