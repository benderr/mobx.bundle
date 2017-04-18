import {call, put, take, fork, cancel, cancelled, takeEvery, select} from 'redux-saga/effects'
import {LOGIN, LOGOUT, LOGIN_INFO} from '../enums/actions'
import {login, loginInfo} from '../actions/loginActions'
import localStorage from 'core/storage/localStorage'
import * as dataContext  from '../bl/accountDataContext'
import {getProfile} from '../selectors/accountSelectors'
import {push} from 'react-router-redux'

const xToken = 'X-TOKEN';

function* authorize(email, pass, redirectUrl) {
	try {
		const authData = yield call(dataContext.login, email, pass);
		yield call(localStorage.setItem, xToken, authData.token);
		yield put(login.success(authData));
		yield call(actualizeProfile);
		yield put(push({pathname: redirectUrl || '/'}));
	} catch (error) {
		yield put(login.failure(error));
	} finally {
		if (yield cancelled()) {
			//todo можно что-нибудь запилить при отмене авторизации
		}
	}
}

function* watchLogin() {
	while (true) {
		const {email, pass, redirectUrl} = yield take(LOGIN.REQUEST);
		const task = yield fork(authorize, email, pass, redirectUrl);
		if (task) {

			const action = yield take([LOGOUT, LOGIN.FAILURE]);
			if (action.type == LOGOUT) {
				cancel(task);
			}
			yield call(logout);
		}
	}
}

function* watchLogout() {
	yield takeEvery(LOGOUT, logout);
}

function* logout() {
	yield call(localStorage.removeItem, xToken);
	yield put(push({pathname: '/signin'}));
}

function* actualizeProfile() {
	try {
		let profile = yield select(getProfile);
		if (profile == null) {
			const token = yield call(localStorage.getItem, xToken);
			if (token) {
				yield put(loginInfo.request());
				const profile = yield call(dataContext.loginInfo, token);
				yield put(loginInfo.success(profile));
			} else {
				yield put(loginInfo.failure('null token'));
			}
		}

	} catch (err) {
		yield put(loginInfo.failure(err));
	}
}

function* startApp() {
	yield fork(actualizeProfile);
}


export default function*() {
	yield [
		fork(startApp),
		fork(watchLogin),
		fork(watchLogout)
	]
}