import {call, put, select, takeEvery} from 'redux-saga/effects'
import logger from 'infrastructure/utils/logger'
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'

import * as dataContext from '../dataProvider/dataContext'
import * as moneyEnums from '../enums/moneyActions'
import * as moneyActions from '../actions/moneyActions'
import {getSectionPos, getSectionStep} from '../selectors/moneySelectors'


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
		} = yield call(dataContext.getMoneyDocs, token, posOpt, stepOpt, q = query, sortField, sortDirection);
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


export default function* () {
	yield [
		takeEvery(moneyEnums.GET_MONEY.REQUEST, getMoneySaga)
	]
}