import adminMiddleware from "@app/middleware/admin";
import { FoodRecord } from "@app/models/entity/FoodRecord";
import { User } from "@app/models/entity/User";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
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

AdminRouter.get("/users/list", async (req: Request, res: Response) => {
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

AdminRouter.get("/users/:userId/view", async (req: Request, res: Response) => {
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

AdminRouter.post(
  "/users/:userId/records/create",
  body("name", "Food name is required to create a record.").exists(),
  body("calories", "Food calories are required for food record.")
    .isNumeric()
    .exists(),
  body("price", "Food price is required to create a record")
    .isNumeric()
    .exists(),
  async (req: Request, res: Response) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty())
      return res.status(400).send({
        message: "Error creating user food record",
        err: validationErrors,
      });

    const { userId } = req.params;
    const { name, calories, price } = req.body;

    try {
      const user = await getRepository(User).findOne({ where: { id: userId } });

      if (!user)
        return res.status(404).send({
          message: "User doesn't exist",
        });

      const foodRecord = new FoodRecord();
      foodRecord.name = name;
      foodRecord.user = user;
      foodRecord.calories = calories;
      foodRecord.price = price;

      await getRepository(FoodRecord).save(foodRecord);

      return res.send({
        success: "User food record created successfully.",
      });
    } catch (err) {
      console.error("Failed Creating User Food Record", {
        err,
      });
    }
  },
);

export default AdminRouter;
