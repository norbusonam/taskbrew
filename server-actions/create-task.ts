"use server";

import prisma from "@taskbrew/prisma/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { revalidateTaskRoutes } from "./utils/revalidate-task-routes";

export async function createTask() {
  // check session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    redirect("/auth");
  }

  // find highest list order
  const highestListOrder = await prisma.task.findFirst({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      listOrder: "desc",
    },
  });

  // find highest board order
  const highestBoardOrder = await prisma.task.findFirst({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      boardOrder: "desc",
    },
  });

  // create task
  await prisma.task.create({
    data: {
      title: "New task",
      userId: session.user.id,
      listOrder: highestListOrder ? highestListOrder.listOrder + 1 : 0,
      boardOrder: highestBoardOrder ? highestBoardOrder.boardOrder + 1 : 0,
    },
  });

  revalidateTaskRoutes();
}
