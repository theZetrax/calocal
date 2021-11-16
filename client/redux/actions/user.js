import * as userActionTypes from '../types/user'

export const updateFoodList = () => (dispatch) => {
  dispatch({
    type: userActionTypes.UPDATE_FILELIST_BEGIN,
  })
}
