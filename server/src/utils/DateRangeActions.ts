import { FoodRecord } from "@app/models/entity/FoodRecord";
import { DefaultCalorieLimit, User } from "@app/models/entity/User";
import GetDateEpoch from "./GetDateEpoch";
import { getRepository } from "typeorm";
import _ from "lodash";

// User Actions
export const GetDailyCalorieLimit = async (user: User) => {
  try {
    const todayDate = GetDateEpoch(new Date(Date.now()));
    const foodRecords = await getRepository(FoodRecord).find({
      where: { user },
      order: { created_at: "DESC" },
    });

    const filteredFoodRecords = _.filter(foodRecords, (record: FoodRecord) => {
      return GetDateEpoch(record.created_at) == todayDate;
    });

    let totalCalories = 0;

    filteredFoodRecords.forEach((record) => (totalCalories += record.calories));

    return DefaultCalorieLimit - totalCalories;
  } catch (err) {
    console.log("Range Select Records failed", {
      err,
    });

    throw err;
  }
};
// export const GetMonthPriceLimit = async (user: User) => {};

// Admin Actions
// export const GetWeekCalorieLimit = async (user: User) => {};
// export const GetWeeksEnteriesAdded = async (user: User) => {};
