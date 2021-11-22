import { ActionTypes, UserPayloadType, UserStoreState } from '../types/user'

/** @type {UserStateType} */
const initialState: UserStoreState = {
  recordList: [],
  accountInformation: undefined,
  loading: false,
}

const userReducer = (
  state = initialState,
  action: { type: string, payload: UserPayloadType },
): UserStoreState => {
  switch (action.type) {
    case ActionTypes.UPDATE_RECORDS_BEGIN:
      return {
        ...state,
        recordList: [],
        loading: true,
      }
    case ActionTypes.UPDATE_RECORDS_SUCCESS:
      return {
        ...state,
        recordList: action.payload.recordList,
        loading: false,
      }
    case ActionTypes.UPDATE_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        accountInformation: action.payload.accountInformation,
      }
    default:
      return { ...state }
  }
}

export default userReducer
