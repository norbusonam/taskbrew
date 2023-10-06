import prisma from "@taskbrew/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  // check session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return Response.redirect("/auth");
  }

  // create task
  const body = await req.json();
  const createdTask = await prisma.task.create({
    data: {
      title: body.name,
      userId: session.user.id,
      duration: body.duration,
      dueDate: body.dueDate,
    },
  });

  return Response.json(createdTask);
}
