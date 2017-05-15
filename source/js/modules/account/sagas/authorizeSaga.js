import {call, put, take, fork, cancel, cancelled, takeEvery, select} from 'redux-saga/effects'
import {LOGIN, LOGOUT} from '../enums/actions'
import {login, checkingAccessStart, checkingAccessStop} from '../actions/loginActions'
import localStorage from 'core/storage/localStorage'
import * as dataContext  from '../dataProvider/accountDataContext'
import {getAuthData} from '../selectors/accountSelectors'
import {push} from 'connected-react-router'

const xToken = 'X-TOKEN';

function* authorize(email, pass, redirectUrl) {
	try {
		const token = btoa(`${email}:${pass}`);
		const authData = yield call(dataContext.profile, token);
		yield call(localStorage.setItem, xToken, token);
		yield put(login.success(authData));
		yield put(push({pathname: redirectUrl || '/'}));
	} catch (error) {
		console.log('FAIL', error);
		yield put(login.failure({
			status: error.status,
			data: error.data
		}));
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
			const logfail = yield take([LOGOUT, LOGIN.FAILURE]);
			cancel(task);
			if (logfail.action == LOGOUT)
				yield call(logout);
		}
	}
}

function* watchLogout() {
	yield takeEvery(LOGOUT, logout);
}

function* logout() {
	yield call(dataContext.logout);
	//yield call(localStorage.removeItem, xToken);
	yield put(push({pathname: '/signin'}));
}

function* initApp() {
	try {
		yield put(checkingAccessStart());
		let authData = yield select(getAuthData);
		if (authData == null) {
			const token = yield call(localStorage.getItem, xToken);
			if (token) {
				yield put(login.request());
				const profile = yield call(dataContext.profile, token);
				yield put(login.success(profile));
				yield put(push({pathname: '/'}));
			} else {
				//yield take(LOGIN.SUCCESS);
				yield put(push({pathname: '/signin'}));
				//yield put(login.failure('null token'));
			}
		}

	} catch (err) {
		yield put(login.failure(err));
	} finally {
		yield put(checkingAccessStop());
	}
}

function* startApp() {
	yield fork(initApp);
}


export default function*() {
	yield [
		fork(startApp),
		fork(watchLogin),
		fork(watchLogout)
	]
}