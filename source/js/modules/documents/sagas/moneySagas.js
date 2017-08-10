import {call, put, select, takeEvery, all} from 'redux-saga/effects'
import logger from 'infrastructure/utils/logger'
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'
import dateHelper from 'common/helpers/dateHelper'
import {notify} from 'common/uiElements/Notify'

import * as dataContext from '../dataProvider/dataContext'
import * as moneyActions from '../actions/moneyActions'
import {getSectionPos, getSectionStep, getSectionState} from '../selectors/moneySelectors'


function* getMoneySaga({q = '', filter = null, sortField, sortDirection, isFirst = false}) {
	try {
		const token = yield select(getCurrentRetailPointId);

		let posOpt = yield select(getSectionPos);
		let stepOpt = yield select(getSectionStep);

		let query = [];
		filter = filter || {};
		if (q.length)
			query.push(`docNum="*${q}*"`);
		query = query.join(';');

		const {
			pos, totalCount, orders
		} = yield call(dataContext.getMoneyDocs, token, posOpt, stepOpt, query, sortField, sortDirection);
		yield put(moneyActions.getMoney.success({
			pos: pos,
			totalCount: totalCount,
			list: orders,
			isFirst: isFirst
		}));

	} catch (error) {
		logger.warn(error);
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
		let query = [];
		if (q.length) query.push(`docNum="*${q}*"`);

		if (dateFrom instanceof Date)
			query.push(`checkoutDateTime=ge="${dateHelper.dateFormat(dateFrom, 'yyyy-mm-dd')}"`);
		if (dateTo instanceof Date)
			query.push(`checkoutDateTime=le="${dateHelper.dateFormat(dateTo, 'yyyy-mm-dd')}"`);
		if (docType.length)
			query.push(`docType=="${docType[0]}"`);

		query = query.join(';');
		// ...

		const {
			pos, totalCount, orders
		} = yield call(dataContext.getMoneyDocs, token, optPos, listStep, query, sortField, sortDirection);
		yield put(moneyActions.getMoney.success({
			pos: pos,
			totalCount: totalCount,
			list: orders
		}));
	} catch (error) {
		notify.error('При загрузке списка произошла ошибка');
		logger.log(error);
	}
}

export default function*() {
	yield all([
		takeEvery(moneyActions.GET_MONEY.REQUEST, getMoneySaga),
		takeEvery(moneyActions.SET_FILTER, getFiltered)
	])
}