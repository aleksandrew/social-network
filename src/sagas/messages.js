// outsource dependencies
import { takeEvery, call } from 'redux-saga/effects';

// local dependencies
import { MESSAGE } from '../constans/types';
import { messagesAPI } from '../services/api';


function * getDialog ({ type, ...payload }) {
    try {
        yield call(getDialogRequest);
    } catch (e) {
        console.log(e);
    }
}

function * startDialog ({ type, ...payload }) {
    const { id } = payload;

    try {
        yield call(startDialogRequest, id);
    } catch (e) {
        console.log(e);
    }
}

async function getDialogRequest () {
    const response = await messagesAPI.getDialog();

    return await response;
}

async function startDialogRequest (id) {
    const response = await messagesAPI.startDialog(id);

    return await response;
}

export default function * () {
    yield takeEvery(MESSAGE.GET_DIALOG, getDialog);
    yield takeEvery(MESSAGE.START_DIALOG, startDialog);
}
