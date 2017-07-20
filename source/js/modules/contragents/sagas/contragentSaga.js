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
		yield put(notify.error('Не удалось загрузить контрагентов'));
	}
}

function* createContragentSaga({contragent}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		yield call(dataContext.createContragent, {token, ...contragent});
		yield put(actions.createContragent.success());

		yield put(notify.success('Контрагент успешно создан'));
		yield put(actions.getListContragent.request())
	} catch (error) {
		yield put(notify.error('При сохранении произошла ошибка'));
	}
}

function* updateContragentSaga({contragent}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		yield call(dataContext.updateContragent, {token, ...contragent});
		yield put(actions.updateContragent.success(contragent.code));

		yield put(notify.success('Контрагент успешно обновлен'));
		yield put(actions.getListContragent.request())
	} catch (error) {
		yield put(notify.error('При сохранении произошла ошибка'));
	}
}


export default function*() {
	yield [
		takeEvery(enums.GET_LIST.REQUEST, getListContragentSaga),
		takeEvery(enums.CREATE.REQUEST, createContragentSaga),
		takeEvery(enums.UPDATE.REQUEST, updateContragentSaga),
		// takeEvery(enums.DELETE.REQUEST, deleteContragentSaga),
		// takeEvery(enums.LOAD_DETAIL.REQUEST, loadDetailContragentSaga)
	]
}