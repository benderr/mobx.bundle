import {call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors';
import * as dataContext from '../dataProvider/discountDataContext';
import * as action from '../actions/discountActions';
import * as enums from '../enums/actions';


function* getListSaga(props) {
	try {
		const token = yield select(getCurrentRetailPointId);
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