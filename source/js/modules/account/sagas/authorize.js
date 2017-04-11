import {call, put, take, fork, cancel, cancelled} from 'redux-saga/effects'
import {LOGIN, LOGOUT} from '../enums/actions'
import {login, logOut, loginCancel} from '../actions/loginActions'
import localStorage from 'core/storage/localStorage'
import * as api  from '../bl/accountDataContext'
const xToken = 'X-TOKEN';

function* authorize(email, pass) {
	try {
		const authData = yield call(api.login, email, pass);
		yield call(localStorage.setItemWithKey(xToken), authData.token);
		yield put(login.success(authData));
	} catch (error) {
		yield put(login.failure(error));
	} finally {
		if (yield cancelled()) {
			yield put(loginCancel());
		}
	}
}

function* watchLogin() {
	while (true) {
		const {email, pass} = yield take(LOGIN.REQUEST);
		const task = yield fork(authorize, email, pass);
		if (task) {
			const action = yield take([LOGOUT, LOGIN.FAILURE]);
			if (action.type == LOGOUT) {
				cancel(task);
			}
			yield call(localStorage.removeItem, xToken)
		}
	}
}

export default function*() {
	yield [
		fork(watchLogin)
	]
}