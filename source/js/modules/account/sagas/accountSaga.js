import {call, put, take, fork, cancel, cancelled, takeEvery, select} from 'redux-saga/effects'
import * as actions from '../enums/actions';
import * as registerDataContext from '../dataProvider/accountDataContext';
import {register, forgot, changePassword} from '../actions/accountActions';

function* forgotPassword({email}) {
	try {
		yield call(registerDataContext.forgotPass, email);
		yield put(forgot.success());
	} catch (error) {
		yield put(forgot.failure({
			status: error.status,
			data: error.data
		}));
	}
}

function* changePass({oldPassword, newPassword}) {
	try {
		yield call(registerDataContext.changePass, oldPassword, newPassword);
		yield put(changePassword.success());
	} catch (error) {
		yield put(changePassword.failure({
			status: error.status,
			data: error.data
		}));
	}
}

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
		takeEvery(actions.REGISTER.REQUEST, registerUser),
		takeEvery(actions.FORGOT.REQUEST, forgotPassword),
		takeEvery(actions.CHANGE_PASSWORD.REQUEST, changePass)
	]
}