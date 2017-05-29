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
		const authData = yield call(dataContext.profile, token);
		yield call(localStorage.setItem, xToken, token);
		yield put(login.success(authData));
		yield fork(retailPointsSaga.runRetailPoints);
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
			yield take([LOGOUT, LOGIN.FAILURE]);
			cancel(task);
			// if (logfail.action == LOGOUT)
			// 	yield call(logout);
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
				yield put(login.success(profile));

				const location = yield  select(accountSelectors.getCurrentLocation);
				if (location.get('pathname') == '/signin')
					yield put(push({pathname: '/'}));
				//yield put(retailPointsActions.GET_RETAIL_POINTS.REQUEST);
				//console.log(retailPointsActions.GET_RETAIL_POINTS.REQUEST)
				
				yield fork(retailPointsSaga.runRetailPoints);
			} else {
				yield put(push(signInLocation));
			}
		} else {
			yield fork(retailPointsSaga.runRetailPoints);
			//yield put(retailPointsActions.GET_RETAIL_POINTS.REQUEST);
		}
		yield put(checkingAccessStop());

	} catch (err) {
		yield put(checkingAccessStop());
		yield put(login.failure(err));
		yield put(push(signInLocation));
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