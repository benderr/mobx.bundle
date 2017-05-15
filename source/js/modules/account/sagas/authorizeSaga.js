import {call, put, take, fork, cancel, cancelled, takeEvery, select} from 'redux-saga/effects'
import {LOGIN, LOGOUT} from '../enums/actions'
import {login} from '../actions/loginActions'
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
		//yield call(actualizeProfile);
		yield put(push({pathname: redirectUrl || '/'}));
	} catch (error) {
		console.log('FAIL', error);
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
		let authData = yield select(getAuthData);
		if (authData == null) {
			const token = yield call(localStorage.getItem, xToken);
			if (token) {
				yield put(login.request());
				const profile = yield call(dataContext.profile, token);
				yield put(login.success(profile));
				const points = yield call(dataContext.test);
				console.log(points);
				yield put(push({pathname: '/'}));
			} else {
				yield put(login.failure('null token'));
			}
		}

	} catch (err) {
		yield put(login.failure(err));
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