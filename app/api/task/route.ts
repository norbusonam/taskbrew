import prisma from "@taskbrew/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  // check session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return Response.redirect("/auth");
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
  const body = await req.json();
  const createdTask = await prisma.task.create({
    data: {
      title: body.title ? body.title.trim() : "New task",
      userId: session.user.id,
      duration: body.duration,
      dueDate: body.dueDate,
      listOrder: highestListOrder ? highestListOrder.listOrder + 1 : 0,
      boardOrder: highestBoardOrder ? highestBoardOrder.boardOrder + 1 : 0,
    },
  });

  return Response.json(createdTask);
}
