import { combineReducers } from 'redux'

// Custom Reducers
import user from '../reducers/userReducer'

const rootReducer = combineReducers({
  user: user,
})

export default rootReducer
