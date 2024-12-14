import {
  getLocalScoreRequest,
  getCricketScoreHistoryRequest,
} from '../services/api/http';
import {put, takeLatest, all} from '@redux-saga/core/effects';
import {formatData} from '../utils/fomatter';

function* getCricketScoreHistory({payload}: any): Generator<any, void, any> {
  try {
    const res = yield getCricketScoreHistoryRequest(payload);
    if (res.data.length > 0) {
      const result = formatData(res.data);
      yield put({
        type: 'API_SUCCESS',
        data: result,
      });
    } else {
      yield put({type: 'API_LIST_END'});
    }
  } catch (err: any) {
    yield put({
      type: 'API_FAILURE',
      error: err.message,
    });
  }
}

function* getLocalScores(): Generator<any, void, any> {
  try {
    const res = yield getLocalScoreRequest();
    if (res.data.length > 0) {
      const result = formatData(res.data);
      yield put({
        type: 'LOCAL_SUCCESS',
        data: result,
      });
    } else {
      yield put({type: 'LOCAL_LIST_END'});
    }
  } catch (err: any) {
    yield put({
      type: 'LOCAL_FAILURE',
      error: err.message,
    });
  }
}

function* remoteScoreSaga(): Generator<any, void, any> {
  yield takeLatest('API_REQUEST', getCricketScoreHistory);
}

function* localScoreSaga(): Generator<any, void, any> {
  yield takeLatest('LOCAL_REQUEST', getLocalScores);
}

export default function* rootSaga(): Generator<any, void, any> {
  yield all([remoteScoreSaga(), localScoreSaga()]);
}
