import * as actionTypes from '../types/user'

/** @type {UserStateType} */
const initialState = {
  foodList: [],
  loading: false,
  error: undefined,
}

/**
 *
 * @param {UserStateType} state
 * @param {ActionType} action
 * @returns {UserStateType}
 */
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FILELIST_BEGIN:
      return {
        ...state,
        foodList: [],
        loading: false,
        error: undefined,
      }
    case actionTypes.UPDATE_FILELIST_SUCCESS:
      return {
        ...state,
        foodList: action.payload || [],
        loading: false,
      }
    case actionTypes.UPDATE_FILELIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error || undefined,
      }
    default:
      return { ...state }
  }
}

export default userReducer
