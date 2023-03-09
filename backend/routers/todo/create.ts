import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { ErrorResBody } from "../../types";
import { ResTodo } from "./types/res-todo";

type CreateTodoReqBody = {
  title: string;
  due: Date;
};

type CreateTodoResBody = {
  todo: ResTodo;
};

export const createTodo = async (
  req: Request<{}, {}, CreateTodoReqBody>,
  res: Response<CreateTodoResBody | ErrorResBody>
) => {
  let todo;
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    todo = await prisma.todo.create({
      data: {
        ...req.body,
        creatorId: req.userId,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to create todo" });
  }
  return res.status(201).json({
    todo: {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      due: todo.due,
    },
  });
};
