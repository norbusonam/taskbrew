import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { ErrorResBody } from "../../types";

type GetMeResBody = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export const getMe = async (
  req: Request,
  res: Response<GetMeResBody | ErrorResBody>
) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to get user" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};
