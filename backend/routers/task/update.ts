import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { ResTask } from "./types/res-task";

type UpdateTaskReqParams = {
  id: string;
};

type UpdateTaskReqBody = {
  title: string;
  completed: boolean;
  due: Date;
};

type UpdateTaskResBody = {
  task: ResTask;
};

export const updateTask = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let task;
  try {
    task = await prisma.task.update({
      where: {
        creatorId_id: {
          creatorId: req.userId,
          id: req.params.id,
        },
      },
      data: {
        ...req.body,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to update task" });
  }
  return res.status(200).json({
    task: {
      id: task.id,
      title: task.title,
      completed: task.completed,
      due: task.due,
    },
  });
};
