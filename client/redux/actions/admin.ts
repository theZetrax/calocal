import axios from 'axios'

// import GetDateEpoch from '@lib/GetDateEpoch'
import { ActionTypes as RecordActionTypes } from '../types/user'
import { ActionTypes as AdminActionTypes } from '../types/admin'

export const getAllRecords = () => async (dispatch) => {
  try {
    dispatch({
      type: RecordActionTypes.UPDATE_RECORDS_BEGIN,
    })
    const response = await axios('/admin/')

    dispatch({
      type: RecordActionTypes.UPDATE_RECORDS_SUCCESS,
      payload: { recordList: response.data.records },
    })
  } catch (err) {
    console.error('Fetching All Records Failed', {
      err,
    })
  }
}

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: AdminActionTypes.UPDATE_USERLIST_BEGIN,
    })

    const response = await axios('/admin/users')

    dispatch({
      type: AdminActionTypes.UPDATE_USERLIST_SUCCESS,
      payload: { userList: response.data.users },
    })
  } catch (err) {
    console.log('Fetching Users Failed', {
      err,
    })
  }
}
