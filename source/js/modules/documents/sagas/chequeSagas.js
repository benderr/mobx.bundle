import {call, put, select, take, fork, takeEvery} from 'redux-saga/effects'
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'
import logger from 'infrastructure/utils/logger'
import dateHelper from 'common/helpers/dateHelper'
import {notify} from 'common/uiElements/Notify'

import * as dataContext from '../dataProvider/dataContext'
import * as chequeActions from '../actions/chequeActions'
import {getSectionPos, getSectionState, getSectionStep} from '../selectors/chequeSelectors'


function* getChequeSaga({q = '', filter = null, sortField, sortDirection, isFirst = false, ...props}) {
	try {
		const token = yield select(getCurrentRetailPointId);

		let posOpt = yield select(getSectionPos);
		let stepOpt = yield select(getSectionStep);

		//region Search box
		let query = ['shift.id!=":external"'];
		filter = filter || {};

		if (q.length)
			query.push(`docNum="*${q}*"`);

		query = query.join(';');
		//endregion

		const isFirstRequest = isFirst;
		const {pos, totalCount, orders} = yield call(dataContext.getOrders, token, posOpt, stepOpt, q = query, sortField, sortDirection);

		yield put(chequeActions.getCheque.success({
			pos: pos,
			totalCount: totalCount,
			list: orders,
			isFirst: isFirstRequest
		}));

	} catch (error) {
		notify.error('При загрузке списка произошла ошибка');
		logger.log(error);
	}
}

function* getFiltered(props) {

	try {
		const token = yield select(getCurrentRetailPointId);
		let stateImmutable = yield select(getSectionState);

		stateImmutable = stateImmutable.toJS();

		const {dateFrom = null, dateTo = null, docType = []} = props;
		const {sortField, sortDirection, q = '', pos: optPos, listStep} = stateImmutable;

		// ...
		let query = ['shift.id!=":external"'];
		if (q.length) query.push(`docNum="*${q}*"`);

		if (dateFrom instanceof Date)
			query.push(`checkoutDateTime=ge="${dateHelper.dateFormat(dateFrom, 'isoUtcDateTime')}"`);
		if (dateTo instanceof Date)
			query.push(`checkoutDateTime=le="${dateHelper.dateFormat(dateTo, 'isoUtcDateTime')}"`);
		if (docType.length)
			query.push(`docType=="${docType[0]}"`);

		query = query.join(';');
		// ...

		const {
			pos, totalCount, orders
		} = yield call(dataContext.getOrders, token, optPos, listStep, query, sortField, sortDirection);
		yield put(chequeActions.getCheque.success({
			pos: pos,
			totalCount: totalCount,
			list: orders
		}));
	} catch (error) {
		notify.error('При загрузке списка произошла ошибка');
		logger.log(error);
	}
}


export default function* () {
	yield [
		takeEvery(chequeActions.GET_CHEQUE.REQUEST, getChequeSaga),
		takeEvery(chequeActions.SET_FILTER, getFiltered),
	]
}