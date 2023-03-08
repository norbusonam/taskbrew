import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../../prisma/client";
import { ErrorResBody } from "../../types/error-res-body";
import { AuthResBody } from "./types/auth-res-body";

type LoginReqBody = {
  email: string;
  password: string;
};

export const login = async (
  req: Request<{}, {}, LoginReqBody>,
  res: Response<AuthResBody | ErrorResBody>
) => {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
  } catch {
    return res.status(500).json({ message: "Unable to find user" });
  }
  if (!user) {
    return res
      .status(401)
      .json({ message: "User with that email does not exist" });
  }
  const passwordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }
  const token = jwt.sign({ sub: user.id }, process.env.TOKEN_SECRET);
  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    token,
  });
};
