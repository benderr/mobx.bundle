import {call, put, take, fork, cancel, cancelled, takeEvery, select} from 'redux-saga/effects'
import {LOGIN, LOGOUT} from '../enums/actions'
import {login, checkingAccessStart, checkingAccessStop} from '../actions/loginActions'
import localStorage from 'core/storage/localStorage'
import * as dataContext  from '../dataProvider/accountDataContext'
import * as accountSelectors from '../selectors/accountSelectors'
import {push, replace} from 'connected-react-router'
import * as retailPointsSaga from '../../retailPoints/sagas/retailPointsSaga'

const xToken = 'X-TOKEN';
const signInLocation = {pathname: '/signin'};

function* authorize(email, pass, redirectUrl) {
	try {
		const token = btoa(`${email}:${pass}`);
		const profile = yield call(dataContext.profile, token);
		yield call(localStorage.setItem, xToken, token);
		yield put(login.success({profile, token}));
		yield fork(retailPointsSaga.runRetailPoints);
		yield put(push({pathname: redirectUrl || '/'}));
	} catch (error) {
		console.log('FAIL', error);
		yield put(login.failure({
			status: error.status,
			data: error.data
		}));
	}
}

function* watchLogin() {
	while (true) {
		const {email, pass, redirectUrl} = yield take(LOGIN.REQUEST);
		const task = yield fork(authorize, email, pass, redirectUrl);
		if (task) {
			yield take([LOGOUT, LOGIN.FAILURE]);
			cancel(task);
		}
	}
}

function* watchLogout() {
	yield takeEvery(LOGOUT, logout);
}

function* logout() {
	yield call(dataContext.logout);
	yield call(localStorage.removeItem, xToken);
	yield put(push(signInLocation));
}

function* initApp() {
	try {
		yield put(checkingAccessStart());
		let authData = yield select(accountSelectors.getAuthData);

		if (authData == null) {
			const token = yield call(localStorage.getItem, xToken);
			if (token) {
				yield put(login.request());
				const profile = yield call(dataContext.profile, token);
				yield put(login.success({profile, token}));

				const location = yield  select(accountSelectors.getCurrentLocation);
				if (location.get('pathname') == '/signin')
					yield put(push({pathname: '/'}));

				yield fork(retailPointsSaga.runRetailPoints);
			}
		} else {
			yield fork(retailPointsSaga.runRetailPoints);
		}
		yield put(checkingAccessStop());

	} catch (err) {
		yield put(checkingAccessStop());
		yield put(login.failure(err));
		yield put(push(signInLocation));
		yield call(localStorage.removeItem, xToken);
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