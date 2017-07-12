import {call, put, take, fork, takeEvery, select} from 'redux-saga/effects'
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'
import {notify} from 'common/uiElements/Notify'

import * as actions from '../actions/contragentActions'
import * as dataContext from '../dataProvider/contragentDataContext'
import * as enums from '../enums/actions'


function* getListContragentSaga(params) {
	try {
		const token = yield select(getCurrentRetailPointId);
		const data = yield call(dataContext.getListContragent, {token, ...params});
		yield put(actions.getListContragent.success(data));
	} catch (error) {
		console.log('getListContragentSaga - error');
		// yield put(notify.error('Не удалось загрузить контрагентов'));
		// yield put(actions.getListContragent.failure({
		// 	status: error.status,
		// 	data: error.data
		// }));
	}
}

function* createContragentSaga({contragent}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		yield put(notify.success('Данные успешно сохранены'));
	} catch (error) {
		yield put(notify.error('Не удалось сохранить контрагента'));

	}
}

function* updateContragentSaga({contragent}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		yield put(notify.success('Данные успешно сохранены'));
	} catch (error) {
		yield put(notify.error('Не удалось сохранить контрагента'));

	}
}

function* deleteContragentSaga({code}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		yield put(notify.success('Контрагент успешно удален'));
	} catch (error) {
		yield put(notify.error('Не удалось удалить контрагента'));

	}
}

function* loadDetailContragentSaga({code}) {
	try {
		const token = yield select(getCurrentRetailPointId);
	} catch (error) {
		yield put(notify.error('Не удалось загрузить контрагента'));

	}
}


export default function*() {
	yield [
		takeEvery(enums.GET_LIST.REQUEST, getListContragentSaga),
		takeEvery(enums.CREATE.REQUEST, createContragentSaga),
		takeEvery(enums.UPDATE.REQUEST, updateContragentSaga),
		takeEvery(enums.DELETE.REQUEST, deleteContragentSaga),
		takeEvery(enums.LOAD_DETAIL.REQUEST, loadDetailContragentSaga)
	]
}