import { Router } from "express";
import { login, signup } from "./auth";
import { createTodo, deleteTodo, updateTodo } from "./todo";
import { listTodos } from "./todo/list";
import { getUser, updateUser } from "./user";

export const apiRouter = Router()
  // auth routes
  .post("/auth/login", login)
  .post("/auth/signup", signup)

  // todo routes
  .get("/todos", listTodos)
  .post("/todos", createTodo)
  .put("/todos/:id", updateTodo)
  .delete("/todos/:id", deleteTodo)

  // user routes
  .get("/users", getUser)
  .post("/users", updateUser);
