import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { getRepository } from "typeorm";

import ServerConfig from "@config/server.conf.json";
import { User } from "@app/models/entity/User";
import GenerateToken from "@app/utils/GenerateToekn";

const USER_TOKEN = "user-token";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.cookies[USER_TOKEN];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = verify(token, ServerConfig.token);
    res.locals.user = payload.user;
  } catch (err) {
    return res.sendStatus(401);
  }

  const userId = res.locals.user;
  if (!(await getRepository(User).findOne({ where: { id: userId } })))
    return res.sendStatus(401);

  const newToken = GenerateToken(userId);
  res.cookie("user-token", `Bearer ${newToken}`, {
    httpOnly: true,
    expires: new Date(Date.now() + 3600000 / 2), // cookie will be removed after 8 hours
  });

  next();
};

export default authMiddleware;
