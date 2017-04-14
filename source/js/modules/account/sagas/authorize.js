import {call, put, take, fork, cancel, cancelled} from 'redux-saga/effects'
import {LOGIN, LOGOUT} from '../enums/actions'
import {login, logOut, loginCancel} from '../actions/loginActions'
import localStorage from 'core/storage/localStorage'
import * as dataContext  from '../bl/accountDataContext'
import {push, go} from 'react-router-redux'
const xToken = 'X-TOKEN';

function* authorize(email, pass) {
	try {
		const authData = yield call(dataContext.login, email, pass);
		yield call(localStorage.setItemWithKey(xToken), authData.token);
		yield put(login.success(authData));
		yield put(push({pathname: '/'}));
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
		const {email, pass, type} = yield take([LOGIN.REQUEST, LOGOUT]);

		if (type == LOGIN.REQUEST) {
			const task = yield fork(authorize, email, pass);
			if (task) {
				const action = yield take([LOGOUT, LOGIN.FAILURE]);
				if (action.type == LOGOUT) {
					cancel(task);
				}
				yield call(logout);
			}
		} else {
			yield call(logout);
		}
	}
}

// function* watchLogout() {
// 	while (true) {
// 		yield take(LOGOUT);
// 		yield call(logout);
// 	}
// }

function* logout() {
	yield put(push({pathname: '/signin'}));
	yield call(localStorage.removeItem, xToken)
}

export default function*() {
	yield [
		fork(watchLogin),
		//fork(watchLogout)
	]
}