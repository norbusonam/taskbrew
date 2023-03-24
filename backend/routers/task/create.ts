import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { ErrorResBody } from "../../types";
import { ResTask } from "./types/res-task";

type CreateTaskReqBody = {
  title: string;
  order: number;
  due?: Date;
  listId?: string;
};

type CreateTaskResBody = {
  task: ResTask;
};

export const createTask = async (
  req: Request<{}, {}, CreateTaskReqBody>,
  res: Response<CreateTaskResBody | ErrorResBody>
) => {
  let task;
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    task = await prisma.task.create({
      data: {
        ...req.body,
        creatorId: req.userId,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Unable to create task" });
  }
  return res.status(201).json({
    task: {
      id: task.id,
      title: task.title,
      completed: task.completed,
      order: task.order,
      due: task.due,
      listId: task.listId,
    },
  });
};
