import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { validationResult, body } from "express-validator";
import _ from "lodash";

import authMiddleware from "@app/middleware/auth";
import { FoodRecord } from "@app/models/entity/FoodRecord";
import { DefaultCalorieLimit, User } from "@app/models/entity/User";
import GetDateEpoch from "@app/utils/GetDateEpoch";
import { GetDailyCalorieLimit } from "@app/utils/DateRangeActions";

const RecordRouter = Router();

RecordRouter.use(authMiddleware); // Apply Auth middleware

RecordRouter.get("/", async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;
    const currentUser = await getRepository(User).findOne({
      where: { id: userId },
    });
    const foodRecords = await getRepository(FoodRecord).find({
      where: { user: currentUser },
      order: { created_at: "DESC" },
    });

    const caloriesLeft = await GetDailyCalorieLimit(currentUser);

    return res.json({
      records: foodRecords,
      calorieLimit: DefaultCalorieLimit,
      caloriesLeftToday: caloriesLeft,
    });
  } catch (err) {
    console.error("[Fetch Records] Error", {
      err,
    });
  }
});

/* View Order */
RecordRouter.get("/:recordId", async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user;
    const recordId = req.params.recordId;

    const currentUser = await getRepository(User).findOne(userId);
    const foodRecord = await getRepository(FoodRecord).findOne({
      where: { user: currentUser, id: recordId },
    });

    if (!foodRecord) return res.sendStatus(404);

    return res.json({
      record: foodRecord,
    });
  } catch (err) {
    console.error("[Fetch Records] Error", {
      err,
    });
  }
});

/* Create Food Record Route */
RecordRouter.post(
  "/create",
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
      return res.status(400).json({
        message: "Missing information when creating a food record",
        err: validationErrors,
      });

    const userId = res.locals.user;
    const currentUser = await getRepository(User).findOne(userId);

    const newRecord = new FoodRecord();
    newRecord.name = req.body.name;
    newRecord.calories = req.body.calories;
    newRecord.price = req.body.price;
    newRecord.user = currentUser;

    await getRepository(FoodRecord).save(newRecord);

    return res.status(201).send({
      success: "Food record created successfully.",
      record: newRecord,
    });
  },
);

/* Delete Food Record */
RecordRouter.delete("/:recordId", async (req: Request, res: Response) => {
  const recordId = req.params.recordId;
  const userId = res.locals.user;

  const currentUser = await getRepository(User).findOne(userId);
  const foodRecord = await getRepository(FoodRecord).findOne({
    where: { id: recordId },
  });

  // If record is not found
  if (!foodRecord) return res.sendStatus(404);
  // If user didn't create the record, reject request
  if (foodRecord.user.id !== currentUser.id) return res.sendStatus(403);

  await getRepository(FoodRecord).delete(foodRecord);
  return res.status(200).send({
    success: "Record successfully removed",
    record: foodRecord,
  });
});

/* Select Date range records */
RecordRouter.get(
  "/:startDate/to/:endDate",
  async (req: Request, res: Response) => {
    try {
      const startDate = GetDateEpoch(new Date(Number(req.params.startDate))),
        endDate = GetDateEpoch(new Date(Number(req.params.endDate)));
      const userId = res.locals.user;
      const currentUser = await getRepository(User).findOne(userId);

      if (isNaN(startDate))
        throw new Error("Parameter startDate not in Date format.");
      if (isNaN(endDate))
        throw new Error("Parameter endDate not in Date format.");

      const foodRecords = await getRepository(FoodRecord).find({
        where: { user: currentUser },
        order: { created_at: "DESC" },
      });

      const filteredFoodRecords = _.filter(
        foodRecords,
        (record: FoodRecord) => {
          return (
            GetDateEpoch(record.created_at) <= endDate &&
            GetDateEpoch(record.created_at) >= startDate
          );
        },
      );

      return res.json({
        records: filteredFoodRecords,
      });
    } catch (err) {
      console.log("Range Select Records failed", {
        err,
      });

      return res.status(400).send({
        message: (err as Error).message,
      });
    }
  },
);

export default RecordRouter;
