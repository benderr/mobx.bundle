import {call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors';
import * as dataContext from '../dataProvider/discountDataContext';
import * as action from '../actions/discountActions';
import * as enums from '../enums/actions';


function* getListSaga(params) {
	try {
		const token = yield select(getCurrentRetailPointId);
		const data = yield call(dataContext.getListDiscount, {...params, token});
		yield put(action.getListDiscount.success(data));
	} catch (error) {
		yield put(action.getListDiscount.failure({
			status: error.status,
			data: error.data
		}));
	}
}

// function* createSaga() {
// 	try {
//
// 	} catch (error) {
//
// 	}
// }
//
// function* updateSaga() {
// 	try {
//
// 	} catch (error) {
//
// 	}
// }
//
// function* deleteSaga() {
// 	try {
//
// 	} catch (error) {
//
// 	}
// }


export default function*() {
	yield [
		takeEvery(enums.GET_LIST.REQUEST, getListSaga)
	]
}