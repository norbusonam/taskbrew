import { Router } from "express";
import { checkAuth } from "../middleware";
import { login, signup } from "./auth";
import {
  createTask,
  deleteTask,
  updateTask,
  listTasks,
  reorderTasks,
} from "./task";
import { createList, deleteList, updateList, listLists } from "./list";
import { getMe, updateUser } from "./user";

export const apiRouter = Router()
  // auth routes
  .post("/auth/login", login)
  .post("/auth/signup", signup)

  // task routes
  .get("/tasks", checkAuth, listTasks)
  .post("/tasks", checkAuth, createTask)
  .put("/tasks/:id", checkAuth, updateTask)
  .put("/tasks/reorder", checkAuth, reorderTasks)
  .delete("/tasks/:id", checkAuth, deleteTask)

  // list routes
  .get("/lists", checkAuth, listLists)
  .post("/lists", checkAuth, createList)
  .put("/lists/:id", checkAuth, updateList)
  .delete("/lists/:id", checkAuth, deleteList)

  // user routes
  .get("/users", checkAuth, getMe)
  .put("/users", checkAuth, updateUser);
