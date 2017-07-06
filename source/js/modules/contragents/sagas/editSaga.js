import {call, put, take, fork, takeEvery, select} from 'redux-saga/effects';
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors';
import * as context from '../dataProvider/contragentDataContext';
import * as enums from '../enums/actions';
import * as action from '../actions/editActions';
import {notify} from 'common/uiElements/Notify';


function* createContragentSaga({contragent}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		yield call(context.create, {token, contragent});
		yield put(action.createContragent.success());
		yield put(notify.success('Данные успешно сохранены'));
	} catch (error) {
		yield put(action.createContragent.failure({
			status: error.status,
			data: error.data
		}));
		yield put(notify.success('Не удалось сохранить контрагента'));
	}
}


export default function*() {
	yield [
		takeEvery(enums.CREATE_CONTRAGENT.REQUEST, createContragentSaga)
	]
}