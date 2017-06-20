import {call, put, take, fork, cancel, cancelled, takeEvery, select} from 'redux-saga/effects';
import * as actions from '../enums/actions';
import * as accountDataContext from '../dataProvider/accountDataContext';
import {getStateIntegration, connectIntegration} from '../actions/accountActions';


function* getState() {
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

function* connect() {
	console.log('getState integration');

	try {

	} catch (error) {

	}
}


export default function*() {
	yield [
		takeEvery(actions.GET_STATE_INTEGRATION.REQUEST, getState),
		takeEvery(actions.CONNECT_INTEGRATION.REQUEST, connect),
	]
}