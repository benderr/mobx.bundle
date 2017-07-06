import {call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';
import * as dataContext from '../dataProvider/discountDataContext';

function* getListSaga(props) {
	try {
		const token = '';
		const data = yield put(dataContext.getListDiscount, {...props, token});
		yield put();
	} catch (error) {
		yield put();
	}
}

function* createSaga() {
	try {

	} catch (error) {

	}
}

function* updateSaga() {
	try {

	} catch (error) {

	}
}

function* deleteSaga() {
	try {

	} catch (error) {

	}
}


export default function*() {
	yield []
}