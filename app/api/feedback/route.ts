import prisma from "@taskbrew/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  // check session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    return Response.redirect("/auth");
  }

  // create feedback
  const body = await req.json();
  const feedbackCreated = await prisma.feedback.create({
    data: {
      userId: session.user.id,
      type: body.type,
      message: body.message,
    },
  });

  return feedbackCreated ? Response.json(feedbackCreated) : Response.error();
}
