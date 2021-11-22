export const ActionTypes = {
  UPDATE_RECORDS_BEGIN: 'UPDATE_RECORDS_BEGIN',
  UPDATE_RECORDS_SUCCESS: 'UPDATE_RECORDS_SUCCESS',
  UPDATE_ACCOUNT_INFO_BEGIN: 'UPDATE_ACCOUNT_INFO_BEGIN',
  UPDATE_ACCOUNT_INFO_SUCCESS: 'UPDATE_ACCOUNT_INFO_SUCCESS',
}

export type UserType = {
  id: string,
  username: string,
  fullname: string,
  email: string,
  calorie_limit: number,
  created_at: Date,
  updated_at: Date,
}

export type FoodRecordType = {
  id?: string,
  name: string,
  calories: number,
  price: number,
  user: UserType,
  created_at: Date,
  updated_at: Date,
}

export type AccountInformationType = {
  calorieLimit: number,
  caloriesLeftToday: number,
  monthlyExpenseLimit: number,
  totalMonthExpense: number,
  averageCalories: number,
}

export type UserPayloadType = {
  recordList: FoodRecordType[],
  accountInformation: AccountInformationType,
}

export type UserStoreState = {
  recordList: FoodRecordType[],
  accountInformation: AccountInformationType,
  loading: boolean,
}
