"use client";

import { Task } from "@/lib/database";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { deleteTask } from "@/actions/crud/task";

interface TaskActionsProps {
  task: Task;
}

export function TaskActions(props: TaskActionsProps) {
  function onDelete() {
    toast.promise(deleteTask(props.task.id), {
      loading: "Deleting task...",
      success: "Task deleted.",
      error: "Failed to delete task.",
    });
  }

  return (
    <div className="flex space-x-2 justify-end">
      <Button variant="ghost" size="icon" onClick={onDelete}>
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
}
