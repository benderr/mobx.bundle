import {call, put, take, fork, takeEvery, select} from 'redux-saga/effects';
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors';
import * as context from '../dataProvider/contragentDataContext';
import * as enums from '../enums/actions';
import * as action from '../actions/listActions';


function* getListSaga({q, column, orderBy, start}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		let data = yield call(context.getList, {token, q, column, orderBy, start});
		yield put(action.getList.success(data));
	} catch (error) {
		yield put(action.getList.failure({
			status: error.status,
			data: error.data
		}));
	}
}


export default function*() {
	yield [
		takeEvery(enums.GET_LIST.REQUEST, getListSaga)
	]
}