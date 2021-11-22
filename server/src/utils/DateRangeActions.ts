import { FoodRecord } from "@app/models/entity/FoodRecord";
import { DefaultCalorieLimit, User } from "@app/models/entity/User";
import GetDateEpoch from "./GetDateEpoch";
import { getRepository } from "typeorm";
import _ from "lodash";
import moment from "moment";

// User Actions
export const GetDailyCalorieLimit = async (user: User) => {
  try {
    const todayDate = GetDateEpoch(new Date(Date.now()));
    const foodRecords = await getRepository(FoodRecord).find({
      where: { user },
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
export const GetMonthPriceLimit = async (user: User) => {
  try {
    // Today
    const todayDate = GetDateEpoch(new Date(Date.now()));
    // Month Beginning
    const monthBegining = GetDateEpoch(moment().startOf("month").toDate());

    const foodRecords = await getRepository(FoodRecord).find({
      where: { user },
    });

    const filteredFoodRecords = _.filter(foodRecords, (record: FoodRecord) => {
      return (
        GetDateEpoch(record.created_at) >= monthBegining &&
        GetDateEpoch(record.created_at) <= todayDate
      );
    });

    let totalExpense = 0;

    filteredFoodRecords.forEach((record) => (totalExpense += record.price));

    return totalExpense;
  } catch (err) {
    console.error("Error Getting Monthly Food Expense", {
      err,
    });
  }
};

// Admin Actions
export const UserAddedEnteries = async (): Promise<{
  weekEnteries: number;
  weekBeforeEnteries: number;
}> => {
  try {
    const todayDate = GetDateEpoch(new Date(Date.now()));
    const weekStart = GetDateEpoch(moment().startOf("week").toDate());
    const weekBeforeStart = GetDateEpoch(
      moment().startOf("week").subtract(7).toDate(),
    );

    const foodRecords = await getRepository(FoodRecord).find();

    const weekEnteries = _.filter(
      foodRecords,
      (record) =>
        GetDateEpoch(record.created_at) >= weekStart &&
        GetDateEpoch(record.created_at) <= todayDate,
    ).length;
    const weekBeforeEnteries = _.filter(
      foodRecords,
      (record) =>
        GetDateEpoch(record.created_at) >= weekBeforeStart &&
        GetDateEpoch(record.created_at) < weekStart,
    ).length;

    return {
      weekEnteries,
      weekBeforeEnteries,
    };
  } catch (err) {
    console.error("Failed calculating users added enteries last 14 days", {
      err,
    });
  }
};
export const UserAverageCalories = async (user: User) => {
  try {
    const todayDate = GetDateEpoch(new Date(Date.now()));
    const weekStart = GetDateEpoch(moment().startOf("week").toDate());

    const foodRecords = await getRepository(FoodRecord).find({
      where: { user },
    });

    const filteredFoodRecords = _.filter(
      foodRecords,
      (record) =>
        GetDateEpoch(record.created_at) >= weekStart &&
        GetDateEpoch(record.created_at) <= todayDate,
    );
    const filteredCount = filteredFoodRecords.length;
    const filteredCaloriesSum = filteredFoodRecords
      .map((record) => record.calories)
      .reduce((acc, curr) => acc + curr, 0);
    const averageCalories = filteredCaloriesSum / filteredCount;

    return Number(averageCalories.toFixed(2));
  } catch (err) {
    console.error("Failed calculating user's average enteries this week", {
      err,
    });
  }
};
