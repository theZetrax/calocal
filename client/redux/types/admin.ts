import { FoodRecordType, UserType } from './user'

const UPDATE_USERLIST_BEGIN = 'UPDATE_USERLIST_BEGIN'
const UPDATE_USERLIST_SUCCESS = 'UPDATE_USERLIST_SUCCESS'
const UPDATE_SUMMARY_BEGIN = 'UPDATE_SUMMARY_BEGIN'
const UPDATE_SUMMARY_SUCCESS = 'UPDATE_SUMMARY_BEGIN'

export const ActionTypes = {
  UPDATE_USERLIST_BEGIN,
  UPDATE_USERLIST_SUCCESS,
  UPDATE_SUMMARY_BEGIN,
  UPDATE_SUMMARY_SUCCESS,
}

export type AdminPayloadType = {
  recordList: FoodRecordType[],
  userList: UserType[],
  summaryBeforeWeek: number,
  summaryWeek: number,
}

export type AdminStateType = {
  recordList: FoodRecordType[],
  userList: UserType[],
  summaryBeforeWeek: number,
  summaryWeek: number,
  loading: boolean,
}
