// outsource dependencies
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { PROFILE } from '../constans/types';
import { profileAPI } from '../services/api';


function * reviewUser ({ type, ...payload }) {
    const { userId } = payload;

    try {
        const profile = yield call(viewProfile, userId);
        yield put({ type: PROFILE.SET_USER_PROFILE, payload: { profile, userId } });
    } catch (e) {
        console.log(e);
    }
}

function * reviewStatus ({ type, ...payload }) {
    const { userId } = payload;

    try {
        const response = yield call(getStatusRequest, userId);
        yield put({ type: PROFILE.SET_STATUS, status: response });
    } catch (e) {
        console.log(e);
    }
}

function * updateStatus ({ type, ...payload }) {
    const { status } = payload;

    try {
        yield call(updateStatusRequest, status);
        yield put({ type: PROFILE.SET_STATUS, status });
    } catch (e) {
        console.log(e);
    }
}

function * savePhoto ({ type, ...payload }) {
    const { file } = payload;

    try {
        const response = yield call(updateImageRequest, file);
        yield put({ type: PROFILE.SET_PHOTO_SUCCESS, response });
    } catch (e) {
        console.log(e);
    }
}

function * updateData ({ type, ...payload }) {
    const { data, userId } = payload;

    try {
        const { website, facebook, vk, twitter, github, youtobe, instagram, mainLink } = data;
        const primeryProfile = JSON.parse(localStorage.getItem('primeryProfile'))[0];
        const profile = {
            ...primeryProfile,
            ...data,
            contacts: { website, facebook, vk, twitter, github, youtobe, instagram, mainLink },
        };

        yield call(updateDataRequest, profile);
        yield put({ type: PROFILE.SET_USER_PROFILE, payload: { profile, userId } });
    } catch (e) {
        console.log(e);
    }
}


async function viewProfile (id) {
    const response = await profileAPI.viewProfile(id);
    return response.data;
}

async function getStatusRequest (userId) {
    const response = await profileAPI.getStatus(userId);
    return await response.data;
}

async function updateStatusRequest (status) {
    const response = await profileAPI.upadateStatus(status);
    return await response.data;
}

async function updateImageRequest (file) {
    const response = await profileAPI.updateImage(file);
    return await response.data.data.photos;
}

async function updateDataRequest (obj) {
    return await profileAPI.updateProfileData(obj);
}

export default function * () {
    yield takeEvery(PROFILE.USER_ID, reviewUser);
    yield takeEvery(PROFILE.SAVE_PHOTO, savePhoto);
    yield takeEvery(PROFILE.UPDATE_DATA, updateData);
    yield takeEvery(PROFILE.GET_STATUS, reviewStatus);
    yield takeEvery(PROFILE.UPDATE_STATUS, updateStatus);
}
