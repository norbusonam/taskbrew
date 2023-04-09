import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { ErrorResBody } from "../../types";
import { ResTask } from "./types/res-task";

type ReorderTaskReqBody = {
  tasks: {
    id: string;
    order: number;
  }[];
};

type ReorderTaskResBody = {
  tasks: ResTask[];
};

export const reorderTasks = async (
  req: Request<{}, {}, ReorderTaskReqBody>,
  res: Response<ReorderTaskResBody | ErrorResBody>
) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let tasks;
  try {
    tasks = await Promise.all(
      req.body.tasks.map((task) =>
        prisma.task.update({
          where: {
            creatorId_id: {
              creatorId: req.userId as string,
              id: task.id,
            },
          },
          data: {
            order: task.order,
          },
        })
      )
    );
  } catch (error) {
    return res.status(500).json({ message: "Unable to reorder tasks" });
  }
  return res.status(200).json({
    tasks: tasks.map((task) => ({
      id: task.id,
      title: task.title,
      completed: task.completed,
      due: task.due,
      order: task.order,
      listId: task.listId,
    })),
  });
};
