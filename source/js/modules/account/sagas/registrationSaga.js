import {call, put, take, fork, cancel, cancelled, takeEvery, select} from 'redux-saga/effects'
import * as actions from '../enums/actions';
import * as registerDataContext from '../dataProvider/registrationDataContext';
import {register} from '../actions/registrationActions';

function* registerUser({user}) {
	try {
		yield call(registerDataContext.register, user);
		yield put(register.success());
	} catch (error) {
		console.log('REG FAIL', error);
		yield put(register.failure({
			status: error.status,
			data: error.data
		}));
	}
}

export default function*() {
	yield [
		takeEvery(actions.REGISTER.REQUEST, registerUser)
	]
}