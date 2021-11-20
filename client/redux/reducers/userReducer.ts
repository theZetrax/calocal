import { ActionTypes, UserPayloadType, UserStoreState } from '../types/user'

/** @type {UserStateType} */
const initialState: UserStoreState = {
  recordList: [],
  loading: false,
}

const userReducer = (
  state = initialState,
  action: { type: string, payload: UserPayloadType },
): UserStoreState => {
  switch (action.type) {
    case ActionTypes.UPDATE_FILELIST_BEGIN:
      return {
        recordList: [],
        loading: true,
      }
    case ActionTypes.UPDATE_FILELIST_SUCCESS:
      return {
        ...state,
        recordList: action.payload.recordList,
        loading: false,
      }
    default:
      return { ...state }
  }
}

export default userReducer
