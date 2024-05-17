"use server";

import { NewTask, db } from "@/lib/database";
import { revalidatePath } from "next/cache";

export async function createTask(task: NewTask) {
  const res = await db.insertInto("task").values(task).returningAll().execute();
  revalidatePath("/tasks");
  return res;
}

export async function getTasks() {
  return await db.selectFrom("task").selectAll().execute();
}

export async function deleteTask(id: number) {
  const res = await db
    .deleteFrom("task")
    .where("id", "=", id)
    .returningAll()
    .execute();
  revalidatePath("/tasks");
  return res;
}
