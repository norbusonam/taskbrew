"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { Task } from "@taskbrew/prisma/db";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import toast from "react-hot-toast";
import { IconPlus } from "./icons";
import { TaskListItem } from "./task-list-item";

type Props = {
  tasks: Task[];
  canCreateNewTask?: boolean;
};

export function TaskList(props: Props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [activeTask, setActiveTask] = useState<Task | undefined>(undefined);
  const id = useId();
  const router = useRouter();

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks]);

  const createTask = () => {
    toast.promise(
      fetch(`/api/task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listOrder: tasks.length,
        }),
      }).then((res) => {
        if (res.ok) {
          router.refresh();
        } else {
          throw new Error();
        }
      }),
      {
        loading: "Creating task...",
        success: "Task created!",
        error: "Failed to create task",
      },
    );
  };

  const onDragStart = (e: DragStartEvent) => {
    setActiveTask(tasks.find((task) => task.id === e.active.id));
  };

  const onDragEnd = (e: DragEndEvent) => {
    setActiveTask(undefined);
    const { active, over } = e;
    if (over && over.id !== active.id) {
      // figure out new order
      const activeIdx = tasks.findIndex((task) => task.id === active.id);
      const endIdx = tasks.findIndex((task) => task.id === over.id);
      const reorderedTasks = arrayMove(tasks, activeIdx, endIdx);

      // optimistically update state
      reorderedTasks.forEach((task, i) => {
        task.listOrder = i;
      });
      setTasks(reorderedTasks);

      // make update request w/ new order
      toast.promise(
        fetch(`/api/task/reorder`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tasks: reorderedTasks.map((task, i) => ({
              id: task.id,
              listOrder: i,
            })),
          }),
        }).then((res) => {
          if (!res.ok) {
            // revert to old order on failure
            setTasks(props.tasks);
            throw new Error();
          }
        }),
        {
          loading: "Updating task order...",
          success: "Task order updated!",
          error: "Failed to update task order",
        },
      );
    }
  };

  return (
    <div>
      {/* tasks */}
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        id={id}
      >
        <SortableContext items={tasks.map((task) => task.id)}>
          {tasks.map((task) => (
            <TaskListItem
              key={task.id}
              task={task}
              className={`${task.id === activeTask?.id ? "opacity-0" : ""}`}
            />
          ))}
          <DragOverlay>
            {activeTask && <TaskListItem task={activeTask} />}
          </DragOverlay>
        </SortableContext>
      </DndContext>

      {/* add new task */}
      {props.canCreateNewTask && (
        <button
          onClick={createTask}
          className="flex w-full flex-row items-center gap-3 border-b-[1px] border-neutral-200 p-2 text-neutral-500 transition-colors hover:cursor-pointer hover:rounded-md hover:bg-neutral-100 active:bg-neutral-200 dark:border-neutral-800 dark:hover:bg-neutral-800 dark:active:bg-neutral-700"
        >
          <IconPlus className="h-5 w-5" />
          <span>New task</span>
        </button>
      )}
    </div>
  );
}
