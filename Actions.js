import store from './Store'

function addNote(newNote){
  store.dispatch({ type: "addNote",note:newNote}) };

function changeNote(newNote){
  store.dispatch({ type: "changeNote",note:newNote}) };

function changeIndex(newIndex){
  store.dispatch({ type: "changeIndex",index:newIndex}) };

function deleteNote(noteIndex){
  store.dispatch({ type: "deleteNote",index:noteIndex}) };

export { addNote, changeNote, changeIndex, deleteNote }