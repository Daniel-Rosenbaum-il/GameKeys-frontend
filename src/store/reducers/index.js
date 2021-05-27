import { combineReducers } from 'redux'
import { reviewReducer } from './review.reducer'
import { userReducer } from './user.reducer'
import { systemReducer } from './system.reducer'
import { gameReducer } from './game.reducer'

export const rootReducer = combineReducers({
  systemModule: systemReducer,
  reviewModule: reviewReducer,
  userModule: userReducer,
  gameModule: gameReducer,
})
