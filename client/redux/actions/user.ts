import axios from 'axios'

import GetDateEpoch from '../../lib/GetDateEpoch'
import { ActionTypes, UserPayloadType } from '../types/user'

export const getRecordsByRecent = () => async (dispatch) => {
  try {
    dispatch({
      type: ActionTypes.UPDATE_RECORDS_BEGIN,
    })
    const response = await axios.get('/records', {
      withCredentials: true,
    })

    dispatch({
      type: ActionTypes.UPDATE_RECORDS_SUCCESS,
      payload: { recordList: response.data.records },
    })
  } catch (err) {
    console.error('[UserAction] Fetching food records by recent failed', {
      err,
    })
  }
}

export const getRecordsByRange =
  (startDate: Date, endDate: Date) => async (dispatch) => {
    try {
      dispatch({
        type: ActionTypes.UPDATE_RECORDS_BEGIN,
      })

      const startEpoch = GetDateEpoch(startDate)
      const endEpoch = GetDateEpoch(endDate)

      const response = await axios.get(
        `/records/${startEpoch}/to/${endEpoch}`,
        {
          withCredentials: true,
        },
      )

      dispatch({
        type: ActionTypes.UPDATE_RECORDS_SUCCESS,
        payload: { recordList: response.data.records },
      })
    } catch (err) {
      console.error('[UserAction] Fetching food records by range failed', {
        err,
      })
    }
  }

export const clearRecords = () => (dispatch) => {
  dispatch({
    type: ActionTypes.UPDATE_RECORDS_SUCCESS,
    payload: { recordList: [] },
  })
}
