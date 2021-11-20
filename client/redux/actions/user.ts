import axios from 'axios'
import '../../config/axios'

import { ActionTypes, UserPayloadType } from '../types/user'

export const updateFoodList = (payload: UserPayloadType) => (dispatch) => {
  dispatch({
    type: ActionTypes.UPDATE_FILELIST_BEGIN,
    payload: payload,
  })
}

export const getRecordsByRecent = () => async (_dispatch) => {
  try {
    const response = await axios.get('/records', {
      withCredentials: true,
    })

    console.log({
      response,
    })
  } catch (err) {
    console.error('[UserAction] Fetching food records failed', {
      err,
    })
  }

  // dispatch({
  //   type: ActionTypes.
  // })
}
