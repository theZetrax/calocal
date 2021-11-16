import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { User } from "@app/models/entity/User";

const UsersRouter = Router();

UsersRouter.get("/", async (req: Request, res: Response) => {
  const users = await getRepository(User).find();

  res.json({
    success: "Users loaded successfully",
    data: {
      users,
    },
  });
});

UsersRouter.post("/create", async (req: Request, res: Response) => {
  console.log({
    headers: req.headers,
    body: req.body,
  });

  res.json({
    message: "unsuccessfull",
  });
});

export default UsersRouter;
