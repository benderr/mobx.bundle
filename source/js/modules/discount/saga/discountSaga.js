import {call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors';
import {notify} from 'common/uiElements/Notify';

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

function* createDiscountSaga({discount}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		yield call(dataContext.createDiscount, {...discount, token});
		yield put(action.createDiscount.success());

		yield put(notify.success('Данные успешно сохранены'));
		yield put(action.getListDiscount.request());
	} catch (error) {
		yield put(notify.error('При удалении скидки произошла ошибка'));
		yield put(action.createDiscount.failure({
			status: error.status,
			data: error.data
		}));
	}
}

function* updateDiscountSaga({discount}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		yield call(dataContext.updateDiscount, {...discount, token});
		yield put(action.updateDiscount.success(discount));

		yield put(notify.success('Данные успешно сохранены'));
		yield put(action.getListDiscount.request());
	} catch (error) {
		yield put(notify.error('При удалении скидки произошла ошибка'));
		yield put(action.createDiscount.failure({
			status: error.status,
			data: error.data
		}, discount));
	}
}

function* deleteDiscountSaga({code}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		yield call(dataContext.deleteDiscount, {token, code});
		yield put(action.deleteDiscount.success(code));

		yield put(notify.success('Скидка успешно удалена'));
		yield put(action.getListDiscount.request());
	} catch (error) {
		yield put(notify.error('При удалении скидки произошла ошибка'));
		yield put(action.createDiscount.failure({
			status: error.status,
			data: error.data
		}));
	}
}


export default function*() {
	yield [
		takeEvery(enums.GET_LIST.REQUEST, getListSaga),
		takeEvery(enums.CREATE.REQUEST, createDiscountSaga),
		takeEvery(enums.UPDATE.REQUEST, updateDiscountSaga),
		takeEvery(enums.DELETE.REQUEST, deleteDiscountSaga)
	]
}