import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { ErrorResBody } from "../../types";

type UpdateUserReqBody = {
  name: string;
  email: string;
};

type UpdateUserResBody = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export const updateUser = async (
  req: Request<{}, {}, UpdateUserReqBody>,
  res: Response<UpdateUserResBody | ErrorResBody>
) => {
  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  let user;
  try {
    user = await prisma.user.update({
      where: {
        id: req.userId,
      },
      data: req.body,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to update user" });
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
