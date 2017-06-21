import { combineReducers } from 'redux'
import locationReducer from './location'
import minesweeperReducer from './minesweeper'
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    minesweeper: minesweeperReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
