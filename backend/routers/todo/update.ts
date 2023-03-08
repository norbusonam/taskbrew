import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { ResTodo } from "./types/res-todo";

type UpdateTodoReqParams = {
  id: string;
};

type UpdateTodoReqBody = {
  title: string;
  completed: boolean;
  due: Date;
};

type UpdateTodoResBody = {
  todo: ResTodo;
};

export const updateTodo = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let todo;
  try {
    todo = await prisma.todo.update({
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
    return res.status(500).json({ message: "Unable to update todo" });
  }
  return res.status(200).json({
    todo: {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      due: todo.due,
    },
  });
};
