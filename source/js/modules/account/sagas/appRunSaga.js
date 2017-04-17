import {call, put, take, fork, takeEvery} from 'redux-saga/effects'
import {delay} from 'redux-saga'
//import accountDataContext from '../bl/accountDataContext.js'
import localStorage from 'core/storage/localStorage'
import {enums} from '../enums/actions'

var xTokenKey = 'X-TOKEN';

function* getLoginInfo(){
	try {
		// yield call(accountDataContext.getLoginInfo, {
		// 	token: localStorage.get(xTokenKey)
		// });
	} catch (e) {
		yield put({type: enums.LOGIN_INFO.FAIL, error: e});
	}
}

function* startApplicationFlow(action) {
	/*yield put({type: 'APP_LOADING'}); //Показываем лоадер загрузки приложения*/
	const loginInfo = yield getLoginInfo();
	yield put({
		type: enums.LOGIN_INFO.SUCCESS,
		payload: loginInfo
	});
}

export function* watchStart() {
	yield takeEvery(enums.APP_START, startApplicationFlow)
}

export default function*() {
	yield [
		fork(watchStart)
	]
}