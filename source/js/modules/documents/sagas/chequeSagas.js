import {call, put, select, take, fork, takeEvery} from 'redux-saga/effects'
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'
import logger from 'infrastructure/utils/logger'

import * as dataContext from '../dataProvider/dataContext'
import * as enums from '../enums/chequeActions'
import * as chequeActions from '../actions/chequeActions'
import {getSectionPos, getSectionStep} from '../selectors/chequeSelectors'


function* getChequeSaga({filter = null, sortField, sortDirection, isFirst = false}) {
	try {
		const token = yield select(getCurrentRetailPointId);

		let posOpt = yield select(getSectionPos);
		let stepOpt = yield select(getSectionStep);


		//region Search box
		let q = ['shift.id==":external"'];
		filter = filter || {};

		q = q.join(';');
		//endregion

		const isFirstRequest = isFirst;
		const {pos, totalCount, orders} = yield call(dataContext.getOrders, token, posOpt, stepOpt, q, sortField, sortDirection);

		yield put(chequeActions.getCheque.success({
			pos: pos,
			totalCount: totalCount,
			list: orders,
			isFirst: isFirstRequest
		}));

	} catch (error) {
		logger.log(error);
		// yield put(chequeActions.getCheque.failure({error}));
	}
}


export default function* () {
	yield [
		takeEvery(enums.GET_CHEQUE.REQUEST, getChequeSaga)
	]
}