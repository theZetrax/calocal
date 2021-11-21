import { combineReducers } from 'redux'

// Custom Reducers
import user from './userReducer'
import admin from './adminReducer'

const rootReducer = combineReducers({
  user,
  admin,
})

export default rootReducer
