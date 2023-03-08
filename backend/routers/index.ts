import { Router } from "express";
import { checkAuth } from "../middleware/check-auth";
import { login, signup } from "./auth";
import { createTodo, deleteTodo, updateTodo, listTodos } from "./todo";
import { getMe, updateUser } from "./user";

export const apiRouter = Router()
  // auth routes
  .post("/auth/login", login)
  .post("/auth/signup", signup)

  // todo routes
  .get("/todos", checkAuth, listTodos)
  .post("/todos", checkAuth, createTodo)
  .put("/todos/:id", checkAuth, updateTodo)
  .delete("/todos/:id", checkAuth, deleteTodo)

  // user routes
  .get("/users", checkAuth, getMe)
  .put("/users", checkAuth, updateUser);
