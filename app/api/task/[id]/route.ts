import prisma from "@taskbrew/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  // check session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return Response.redirect("/auth");
  }

  // update task
  const body = await req.json();
  const updatedTask = await prisma.task.update({
    where: {
      id: params.id,
      userId: session.user.id,
    },
    data: {
      title: body.title,
      status: body.status,
      dueDate: body.dueDate,
      duration: body.duration,
    },
  });

  return Response.json(updatedTask);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  // check session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return Response.redirect("/auth");
  }

  // delete task
  const deletedTask = await prisma.task.delete({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  return Response.json(deletedTask);
}
