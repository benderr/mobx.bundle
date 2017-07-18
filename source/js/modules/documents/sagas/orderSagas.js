import {call, put, select, take, fork, takeEvery} from 'redux-saga/effects'
import {subscribeToUrl} from 'modules/core/sagas'
import * as actionEnum from '../enums/orderActions'
import * as actions from '../actions/orderActionTypes'
import {getPointId} from 'modules/core/selectors'
import * as dataContext from '../dataProvider/dataContext'
import logger from 'infrastructure/utils/logger'

export function* init() {
	yield takeEvery(actionEnum.GET_ORDERS.REQUEST, getOrders);

	yield put(actions.getOrders.request({
		start: 0,
		count: 50,
		sortField: 'beginDateTime',
		sortDirection: 'desc',
		isFirst: true
	})); //todo брать из localStorage
}

function* getOrders({start, count, filter = null, sortField, sortDirection, isFirst = false}) {
	try {
		const retailPointId = yield select(getPointId);
		let q = ['shift.id==":external"'];
		filter = filter || {};
		if (filter.cashier) {
			q.push(`cashier.name==*${filter.cashier}*`)
		}
		if (filter.docNum) {
			q.push(`docNum=="${filter.docNum}"`)
		}
		if (filter.actualSum) {
			q.push(`actualSum=="${filter.actualSum}"`)
		}
		if (filter.id) {
			q.push(`id=="${filter.id}"`);
		}
		q = q.join(';');

		const isFirstRequest = isFirst && filter == null;

		const {pos, totalCount, orders} = yield call(dataContext.getOrders, retailPointId, start, count, q, sortField, sortDirection);
		yield put(actions.getOrders.success({pos, totalCount, orders, isFirst: isFirstRequest}));
	}
	catch (error) {
		logger.log(error);
		yield put(actions.getOrders.failure({error}));
	}
}

export default function*() {
	yield [
		fork(subscribeToUrl, '/documents/external', init),
		//fork(subscribeToUrl, '/documents/external', initAdd)
	]
}