import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

const initialState = {
  currentIndex: -1,
  notes: []
}

function reducer(state = initialState, action) {
  let index = state.currentIndex;
  switch (action.type) {
    case 'addNote':
      return { ...state, notes: [...state.notes, action.note] }
    case 'changeNote':

      return { ...state, notes: [
                                 ...state.notes.slice(0, index),
                                 action.note,
                                 ...state.notes.slice(index + 1),
                               ] }
    case 'deleteNote':
      return { ...state, notes: [
                                 ...state.notes.slice(0, action.index),
                                 ...state.notes.slice(action.index + 1),
                               ] }
    case 'changeIndex':
      return { ...state, currentIndex: action.index }
    case 'fetch_success':
      return { ...state, notes: action.notes }
    default:
      return state
  }
}

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(mySaga)

export default store