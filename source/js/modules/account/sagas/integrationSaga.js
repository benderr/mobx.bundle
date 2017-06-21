import {call, put, take, fork, cancel, cancelled, takeEvery, select} from 'redux-saga/effects';
import * as actions from '../enums/actions';
import * as accountDataContext from '../dataProvider/accountDataContext';
import {getStateIntegration, connectIntegration, confirmIntegration} from '../actions/accountActions';


function* getState() {
	console.log('getState-saga integration');
	try {
		let data = yield call(accountDataContext.getStateIntegration);
		yield put(getStateIntegration.success(data));
	} catch (error) {
		yield put(getStateIntegration.failure({
			status: error.status,
			data: error.data
		}));
	}
}

function* connect({msLogin, msPassword}) {
	console.log('connect-saga integration');
	try {
		yield call(accountDataContext.connectIntegration, true, msLogin, msPassword);
		yield put(connectIntegration.success());
	} catch (error) {
		yield put(connectIntegration.failure(error));
	}
}

function* confirm({msLogin, msPassword}) {
	try {
		yield call(accountDataContext.connectIntegration, false, msLogin, msPassword);
		yield put(confirmIntegration.success());
	} catch (error) {
		yield put(connectIntegration.failure(error));
	}
}

export default function*() {
	yield [
		takeEvery(actions.GET_STATE_INTEGRATION.REQUEST, getState),
		takeEvery(actions.CONNECT_INTEGRATION.REQUEST, connect),
		takeEvery(actions.CONFIRM_INTEGRATION.REQUEST, confirm)
	]
}