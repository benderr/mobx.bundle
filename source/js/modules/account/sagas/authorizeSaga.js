import {call, put, take, fork, cancel, takeEvery, select} from 'redux-saga/effects'
import {LOGIN, LOGOUT} from '../enums/actions'
import {login, checkingAccessStart, checkingAccessStop, clearApp} from '../actions/loginActions'
import localStorage from 'core/storage/localStorage'
import * as dataContext  from '../dataProvider/accountDataContext'
import * as accountSelectors from '../selectors/accountSelectors'
import * as retailPointsSaga from '../../retailPoints/sagas/retailPointsSaga'
import {encrypt} from 'infrastructure/utils/tokenCrypt'
const xToken = 'X-TOKEN';
const signInLocation = {pathname: '/signin'};

function* authorize(email, pass, redirectUrl) {
	try {
		const token = encrypt(email, pass);
		const profile = yield call(dataContext.profile, token);
		yield call(localStorage.setItem, xToken, token);
		yield put(login.success({profile, token}));
		window.location.href = redirectUrl && redirectUrl != '/' ? redirectUrl : '/retail-points';
	} catch (error) {
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
	yield put(clearApp());
	window.location.href = signInLocation.pathname;
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
					window.location.href = '/';

				yield fork(retailPointsSaga.runRetailPoints);
			}
		} else {
			yield fork(retailPointsSaga.runRetailPoints);
		}
		yield put(checkingAccessStop());

	} catch (err) {
		yield put(checkingAccessStop());
		yield put(login.failure(err));
		window.location.href = signInLocation.pathname;
		yield call(localStorage.removeItem, xToken);
	}
}


export default function*() {
	yield [
		fork(initApp),
		fork(watchLogin),
		fork(watchLogout)
	]
}