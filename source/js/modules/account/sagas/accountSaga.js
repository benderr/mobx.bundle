/**
 * Created by RobertSabiryanov on 16.05.17.
 */
import {call, put, takeLatest} from 'redux-saga/effects'
import * as actions from '../enums/actions';
import {getRetailPoints} from '../actions/accountActions'
import * as dataContext from '../dataProvider/accountDataContext'


function* getPoints() {
	try {
		const response = yield call(dataContext.retailpoints);
		yield put(getRetailPoints.success(response.data[0]));
	}
	catch (e) {
		console.error(e);
		yield put(getRetailPoints.failure(e));
	}
}

export default function*() {
	yield takeLatest(actions.GET_RETAIL_POINT.REQUEST, getPoints);
}
