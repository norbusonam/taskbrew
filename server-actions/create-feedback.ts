"use server";

import { authOptions } from "@taskbrew/app/api/auth/auth-options";
import prisma, { FeedbackType } from "@taskbrew/prisma/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function createFeedback(body: {
  type: FeedbackType;
  message?: string;
}) {
  // check session
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.id) {
    redirect("/auth");
  }

  // create feedback
  await prisma.feedback.create({
    data: {
      userId: session.user.id,
      type: body.type,
      message: body.message,
    },
  });
}
