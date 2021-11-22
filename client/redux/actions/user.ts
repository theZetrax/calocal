import axios from 'axios'

import GetDateEpoch from '../../lib/GetDateEpoch'
import { AccountInformationType, ActionTypes } from '../types/user'

export const getRecordsByRecent = () => async (dispatch) => {
  try {
    dispatch({
      type: ActionTypes.UPDATE_RECORDS_BEGIN,
    })

    const response = await axios.get('/records')

    dispatch({
      type: ActionTypes.UPDATE_ACCOUNT_INFO_SUCCESS,
      payload: {
        accountInformation: <AccountInformationType>{
          averageCalories: response.data.averageCalories,
          calorieLimit: response.data.calorieLimit,
          caloriesLeftToday: response.data.caloriesLeftToday,
          monthlyExpenseLimit: response.data.monthlyExpenseLimit,
          totalMonthExpense: response.data.totalMonthExpense,
        },
      },
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

      const response = await axios.get(`/records/${startEpoch}/to/${endEpoch}`)

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
