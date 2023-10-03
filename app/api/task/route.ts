import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@taskbrew/prisma/db";

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
      targetDate: body.targetDate,
    },
  });

  return Response.json(createdTask);
}
