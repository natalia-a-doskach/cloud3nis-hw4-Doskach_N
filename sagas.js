import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native';
import store from './Store'

function* fetchNotes(action) {
//   alert("fetching notes")
   try {
      const notesJSON = yield AsyncStorage.getItem('notes');
      const notes = JSON.parse(notesJSON);
      if (notes !== null) {
               yield put({type: "fetch_success", notes: notes});
             }
      else{yield put({type: "fetch_fail"});}
   } catch (e) {
      yield put({type: "fetch_fail"});
   }
}

function* putNotes(action) {
//   alert("putting notes")
   try {
       yield AsyncStorage.setItem(
         'notes',
         JSON.stringify(store.getState().notes)
       );
       yield put({type: "put_success"});
     } catch (error) {
       alert("fail")
       yield put({type: "put_fail"});
     }
}

function* mySaga() {
  yield takeEvery("put_requested", putNotes);
  yield takeEvery("fetch_requested", fetchNotes);
}

export default mySaga;