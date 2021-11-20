const UPDATE_FILELIST_BEGIN = 'UPDATE_FILELIST_BEGIN'
const UPDATE_FILELIST_SUCCESS = 'UPDATE_FILELIST_SUCCESS'

export const ActionTypes = {
  UPDATE_FILELIST_BEGIN,
  UPDATE_FILELIST_SUCCESS,
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

export type UserPayloadType = {
  recordList: FoodRecordType[],
}

export type UserStoreState = {
  recordList: FoodRecordType[],
  loading: boolean,
}
