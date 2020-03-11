import { put, takeEvery, take, race, call, fork, cancel, cancelled, actionChannel, takeLatest, flush } from 'redux-saga/effects';
import { buffers } from "redux-saga";

import {
  LOAD_PHOTO_REQUEST,
  LOAD_PHOTOSID_REQUEST,
  LOAD_TEST_REQUEST,
  loadPhotoSuccess,
  loadPhotosIdSuccess,
  loadPhotoFailure,
  loadTestSuccess,
  loadTestFailure,
  IAction,
  loadPhotosIdFailure,
} from 'actions/PageActions';
export const DOMAIN = 'http://localhost:3002';

// отмена запросов fetch
// + обработка ошибок
// + заставка для ошибок

const loadPhoto = (id: string) => {
  const url = DOMAIN + "/api/photos/" + id;
  const init = { method: "GET" };
  return fetch(url, init).then(data => {
    if (data.ok) {
      return data.json()
    }
    throw Error(data.statusText)
  });
}

const loadPhotosId = () => {
  const url = DOMAIN + "/api/photosId?count=10";
  const init = { method: "GET" };
  return fetch(url, init).then(data => {
    if (data.ok) {
      return data.json()
    }
    throw Error(data.statusText)
  });
}

export function* startLoadPhoto(action: IAction) {
  try {
    const data = yield loadPhoto(action.payload);
    yield put(loadPhotoSuccess(data));
  } catch (err) {
    yield put(loadPhotoFailure(err));
  } finally {
    if (yield cancelled())
      yield console.log('Отменен');
  }
}

export function* main() {
  let task;
  while (true) {
    const action = yield take(LOAD_PHOTO_REQUEST);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(startLoadPhoto, action);
  }
}

export function* startLoadPhotosID() {
  try {
    const data = yield loadPhotosId();
    return yield put(loadPhotosIdSuccess(data.data));
  } catch (err) {
    yield put(loadPhotosIdFailure(err));
  }

}

export function* watchLoadPhotosIdRequest() {
  yield takeEvery(LOAD_PHOTOSID_REQUEST, startLoadPhotosID);
}

export function* mainChannel() {
  const requestChan = yield actionChannel(LOAD_PHOTO_REQUEST, buffers.sliding(1));
  yield takeLatest(requestChan, startLoadPhoto);
}

//-------------------------------
function getRandomIntInclusive(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

const loadTest = () => {
  return (new Promise((resolve, reject) => {
    setTimeout(() => resolve("Test_Success"), getRandomIntInclusive(3000, 7000));
    setTimeout(() => reject("Test_Error"), getRandomIntInclusive(3000, 7000));
  }))
}

export function* watchLoadTestRequest() {
  const requestChan = yield actionChannel(LOAD_TEST_REQUEST, buffers.sliding(10));

  while (true) {
    try {
      yield take(requestChan);
      const data = yield loadTest();
      yield put(loadTestSuccess(data));
    } catch (err) {
      yield put(loadTestFailure(err));
      const actions = yield flush(requestChan);
    }
  }
}

//реализация через race
/*export function* loadPhotoSaga(action: IAction) {
  const { task, cancel } = yield race({
    task: call(startLoadPhoto, action),
    cancel: take(LOAD_PHOTO_REQUEST),
  })
  if (cancel) {
    put(cancel);
  }
}*/

/*export function* watchLoadPhotoRequest() {
  yield takeEvery(LOAD_PHOTO_REQUEST, loadPhotoSaga);
}*/




