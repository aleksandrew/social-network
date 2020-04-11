// outsource dependencies
import { takeEvery, put, call } from 'redux-saga/effects';

// local dependencies
import { USERS } from '../constans/types';
import { usersAPI } from '../services/api';


function * follow ({ type, ...payload }) {
    const { userId } = payload;

    try {
        yield put({ type: USERS.TOGGLE_FOLLOWING_PROGRESS, payload: { isFetching: true, userId } });
        const result = yield call(followUsersRequest, userId);

        if (result) {
            yield put({ type: USERS.FOLLOW_SUCCESS, userId });
        }
        yield put({ type: USERS.TOGGLE_FOLLOWING_PROGRESS, payload: { isFetching: false, userId } });
    } catch (e) {
        console.log(e);
    }
}

function * unfollow ({ type, ...payload }) {
    const { userId } = payload;

    try {
        yield put({ type: USERS.TOGGLE_FOLLOWING_PROGRESS, payload: { isFetching: true, userId } });
        const result = yield call(unfollowUsersRequest, userId);

        if (result) {
            yield put({ type: USERS.UNFOLLOW_SUCCESS, userId });
        }
        yield put({ type: USERS.TOGGLE_FOLLOWING_PROGRESS, payload: { isFetching: false, userId } });
    } catch (e) {
        console.log(e);
    }
}

function * requestUsers ({ type, ...payload }) {
    const { currentPage, pageSize } = payload;

    try {
        yield put({ type: USERS.TOGGLE_IS_FETCHING, isFetching: true });
        yield put({ type: USERS.SET_CURRENT_PAGE, currentPage });

        const data = yield call(getUsersRequest, currentPage, pageSize);

        yield put({ type: USERS.TOGGLE_IS_FETCHING, isFetching: false });
        if (data) {
            yield put({ type: USERS.SET_USERS, users: data.items });
            yield put({ type: USERS.SET_TOTAL_USERS_COUNT, count: data.totalCount });
        }
    } catch (e) {
        console.log(e);
    }
}

function * searchUsers ({ type, ...payload }) {
    const { term } = payload;

    try {
        const data = yield call(searchUsersRequest, term);

        if (data) {
            yield put({ type: USERS.SET_SEARCH_USERS, payload: { users: data.items, term } });
        }
    } catch (e) {
        console.log(e);
    }
}

function * setAllUsers ({ type, ...payload }) {
    try {
        yield put({ type: USERS.TOGGLE_IS_FETCHING, isFetching: true });
        const response = yield call(getUsersRequest);
        let b = 1;

        for (let i = 0; i <= response.totalCount; i+= 100) {
            b++;
            const data = yield call(getUsersRequest, b, 100);

            yield put({ type: USERS.ALL_USERS, users: data.items });
            yield put({ type: USERS.SET_FOLLOWED_USERS, users: data.items });
        }
        yield put({ type: USERS.TOGGLE_IS_FETCHING, isFetching: false });
    } catch (e) {
        console.log(e);
    }
}

async function followUsersRequest (userId) {
    const response = await usersAPI.followUsers(userId);
    if (!response.resultCode) {
        return await true;
    }
}

async function unfollowUsersRequest (userId) {
    const response = await usersAPI.unfollowUsers(userId);
    if (!response.resultCode) {
        return await true;
    }
}

async function getUsersRequest (currentPage, pageSize) {
    const response = await usersAPI.getUsers(currentPage, pageSize);

    return await response;
}

async function searchUsersRequest (term) {
    const response = await usersAPI.searchUsers(term);

    return await response;
}

export default function * () {
    yield takeEvery(USERS.FOLLOW, follow);
    yield takeEvery(USERS.UNFOLLOW, unfollow);
    yield takeEvery(USERS.SEARCH_USERS, searchUsers);
    yield takeEvery(USERS.SET_ALL_USERS, setAllUsers);
    yield takeEvery(USERS.REQUEST_USERS, requestUsers);
}
