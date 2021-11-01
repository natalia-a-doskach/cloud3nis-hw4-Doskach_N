import { createStore } from 'redux'

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
    default:
      return state
  }
}

const store = createStore(reducer)

export default store