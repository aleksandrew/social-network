// outsource dependencies
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { authAPI } from '../services/api';
import { APP, AUTH } from '../constans/types';

function * initializeApp () {
    try {
        const payload = yield call(getAuthUserDataRequest);

        yield put({ type: APP.INITIALIZED_SUCCESS });

        if (payload) {
            yield put({ type: AUTH.SET_USER_DATA, payload: { ...payload, isAuth: true } });
        }
    } catch (e) {
        console.log(e);
    }
}

async function getAuthUserDataRequest () {
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
        return response.data.data;
    }
}

export default function * () {
    yield takeEvery(APP.INITIALIZED_APP, initializeApp);
}
