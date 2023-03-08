import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { ErrorResBody } from "../../types/error-res-body";
import { ResTodo } from "./types/res-todo";

type ListTodosReqQuery = {
  from: string;
  to: string;
};

type ListTodosResBody = {
  todos: ResTodo[];
};

export const listTodos = async (
  req: Request<{}, {}, {}, ListTodosReqQuery>,
  res: Response<ListTodosResBody | ErrorResBody>
) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let todos;
  try {
    todos = await prisma.todo.findMany({
      where: {
        creatorId: req.userId,
        created: {
          gte: req.query.from,
          lte: req.query.to,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to list todos" });
  }
  return res.status(200).json({
    todos: todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      due: todo.due,
    })),
  });
};
