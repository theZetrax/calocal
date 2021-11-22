import {
  ActionTypes as AdminActionTypes,
  AdminPayloadType,
  AdminStateType,
} from 'redux/types/admin'
import { ActionTypes as RecordActionTypes } from '../types/user'

/** @type {UserStateType} */
const initialState: AdminStateType = {
  recordList: [],
  userList: [],
  summaryBeforeWeek: 0,
  summaryWeek: 0,
  loading: false,
}

const adminReducer = (
  state = initialState,
  action: { type: string, payload: AdminPayloadType },
): AdminStateType => {
  switch (action.type) {
    case RecordActionTypes.UPDATE_RECORDS_BEGIN:
      return {
        ...state,
        recordList: [],
        loading: true,
      }
    case RecordActionTypes.UPDATE_RECORDS_SUCCESS:
      return {
        ...state,
        recordList: action.payload.recordList,
        summaryBeforeWeek: action.payload.summaryBeforeWeek,
        summaryWeek: action.payload.summaryWeek,
        loading: false,
      }
    case AdminActionTypes.UPDATE_SUMMARY_BEGIN:
      return {
        ...state,
        summaryBeforeWeek: 0,
        summaryWeek: 0,
        loading: true,
      }
    case AdminActionTypes.UPDATE_SUMMARY_SUCCESS:
      return {
        ...state,
        summaryBeforeWeek: action.payload.summaryBeforeWeek,
        summaryWeek: action.payload.summaryWeek,
      }
    case AdminActionTypes.UPDATE_USERLIST_BEGIN:
      return {
        ...state,
        userList: [],
        loading: true,
      }
    case AdminActionTypes.UPDATE_USERLIST_SUCCESS:
      return {
        ...state,
        userList: action.payload.userList,
        loading: false,
      }
    default:
      return { ...state }
  }
}

export default adminReducer
