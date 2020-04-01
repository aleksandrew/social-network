// outsource dependencies
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { authAPI } from '../services/api';
import { APP, AUTH } from '../constans/types';


function * getAuthUserData () {
    try {
        const payload = yield call(getAuthUserDataRequest);

        if (payload) {
            yield put({ type: APP.SET_ERROR_MESSAGES, messages: null });
            yield put({ type: AUTH.SET_USER_DATA, payload: { ...payload, isAuth: true } });
        } else {
            // yield put({type: APP.SET_ERROR_MESSAGES, messages: request.data.messages[0]});
        }
    } catch (e) {
        console.log(e);
    }
}

function * login ({ type, ...payload }) {
    try {
        const request = yield call(loginRequest, payload);
        if (!request.data.resultCode) {
            yield call(getAuthUserData);
            yield put({ type: APP.SET_ERROR_MESSAGES, messages: null });
        } else {
            yield put({ type: APP.SET_ERROR_MESSAGES, messages: request.data.messages[0] });
        }
    } catch (e) {
        console.log(e);
    }
}

function * logout () {
    try {
        const response = yield call(logoutRequest);

        if (response.data.resultCode === 0) {
            localStorage.removeItem('primeryProfile');
            yield put({ type: AUTH.SET_LOGOUT });
        }
    } catch (e) {
        console.log(e);
    }
}

async function getAuthUserDataRequest () {
    const response = await authAPI.me();

    if (!response.data.resultCode) {
        return await response.data.data;
    }

    console.log(response.data.messages[0]);
    return await response.data.messages[0];
}

async function loginRequest (payload) {
    const { email, password, rememberMe } = payload;
    return await authAPI.login(email, password, rememberMe);
}

async function logoutRequest () {
    return await authAPI.logout();
}

export default function * () {
    yield takeEvery(AUTH.GET_AUTH_USER_DATA, getAuthUserData);
    yield takeEvery(AUTH.LOGIN, login);
    yield takeEvery(AUTH.LOGOUT, logout);
}
