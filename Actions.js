import store from './Store'

function addNote(newNote){
  store.dispatch({ type: "addNote",note:newNote})
   putNotes();};

function changeNote(newNote){
  store.dispatch({ type: "changeNote",note:newNote})
  putNotes();};

function changeIndex(newIndex){
  store.dispatch({ type: "changeIndex",index:newIndex}) };

function deleteNote(noteIndex){
  store.dispatch({ type: "deleteNote",index:noteIndex})
   putNotes(); };

function putNotes(){
  store.dispatch({ type: "put_requested"})};

function getNotes(){
  store.dispatch({ type: "fetch_requested"}) };

export { addNote, changeNote, changeIndex, deleteNote, putNotes, getNotes }