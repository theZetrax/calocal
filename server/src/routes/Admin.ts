import adminMiddleware from "@app/middleware/admin";
import { FoodRecord } from "@app/models/entity/FoodRecord";
import { User } from "@app/models/entity/User";
import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";

const AdminRouter = Router();
AdminRouter.use(adminMiddleware);

AdminRouter.get("/", async (req: Request, res: Response) => {
  try {
    const foodRecords = await getRepository(FoodRecord).find({
      relations: ["user"],
      order: { created_at: "DESC" },
    });

    return res.json({
      records: foodRecords,
    });
  } catch (err) {
    console.error("[Fetch Records] Error", {
      err,
    });
  }
});

AdminRouter.get("/:recordId", async (req: Request, res: Response) => {
  const recordId = req.params.recordId;

  try {
    const foodRecord = await getRepository(FoodRecord).findOne({
      where: { id: recordId },
      relations: ["user"],
    });

    if (!foodRecord) return res.sendStatus(404);

    return res.send({
      record: foodRecord,
    });
  } catch (err) {
    console.error("Fetch Record Failed", {
      err,
    });
  }
});

AdminRouter.get("/users", async (req: Request, res: Response) => {
  try {
    const userList = await getRepository(User).find({
      order: { created_date: "DESC" },
    });

    return res.send({
      users: userList,
    });
  } catch (err) {
    console.error("Fetching Users List failed", {
      err,
    });
  }
});

AdminRouter.get("/users/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const user = await getRepository(User).findOne({
      where: { id: userId },
      relations: ["records"],
    });

    if (!user) return res.sendStatus(404);
    return res.send({
      user,
    });
  } catch (err) {
    console.error("Fetching User Account Information Failed", {
      err,
    });
  }
});

AdminRouter.get(
  "/users/:userId/records/:recordId",
  async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const recordId = req.params.recordId;

    try {
      const user = await getRepository(User).findOne({ where: { id: userId } });

      if (!user)
        return res.status(404).send({
          message: "User doesn't exist.",
        });

      const foodRecord = await getRepository(FoodRecord).findOne({
        where: { user: user, id: recordId },
        relations: ["user"],
      });

      if (!foodRecord)
        return res.status(404).send({
          message: "Food record doesn't exist",
        });

      return res.send({
        record: foodRecord,
      });
    } catch (err) {
      console.error("Fetching User Food Record Failed", {
        err,
      });
    }
  },
);

export default AdminRouter;
