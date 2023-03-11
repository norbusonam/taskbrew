import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../../prisma/client";
import { ErrorResBody } from "../../types";
import { AuthResBody } from "./types/auth-res-body";

type SignupReqBody = {
  email: string;
  name: string;
  password: string;
};

export const signup = async (
  req: Request<{}, {}, SignupReqBody>,
  res: Response<AuthResBody | ErrorResBody>
) => {
  let user;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    user = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword,
      },
    });
  } catch {
    return res.status(500).json({ message: "Unable to create user" });
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
