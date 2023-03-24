import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { ErrorResBody } from "../../types";
import { ResTask } from "./types/res-task";

type ListTasksReqQuery = {
  from: string;
  to: string;
};

type ListTasksResBody = {
  tasks: ResTask[];
};

export const listTasks = async (
  req: Request<{}, {}, {}, ListTasksReqQuery>,
  res: Response<ListTasksResBody | ErrorResBody>
) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let tasks;
  try {
    tasks = await prisma.task.findMany({
      where: {
        creatorId: req.userId,
        created: {
          gte: req.query.from,
          lte: req.query.to,
        },
      },
      orderBy: {
        created: "desc",
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to list tasks" });
  }
  return res.status(200).json({
    tasks: tasks.map((task) => ({
      id: task.id,
      title: task.title,
      completed: task.completed,
      due: task.due,
    })),
  });
};
