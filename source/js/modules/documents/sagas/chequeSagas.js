import {call, put, select, take, fork, takeEvery, throttle} from 'redux-saga/effects'
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'
import {notify} from 'common/uiElements/Notify'

import * as actEnums from '../actions/chequeActions'
import * as dataContext from '../dataProvider/dataContext'
import {getListPropsState} from '../selectors/chequeSelectors'


function* getListChequeSaga({isFirst = false, step = false}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		const propState = yield select(getListPropsState);

		// region: query params
		let query = ['shift.id==":external"']; // TODO: Чеки 'shift.id!=":external"'

		/*
		if (dateFrom instanceof Date)
			query.push(`checkoutDateTime=ge="${dateHelper.dateFormat(dateFrom, 'isoUtcDateTime')}"`);
		if (dateTo instanceof Date)
			query.push(`checkoutDateTime=le="${dateHelper.dateFormat(dateTo, 'isoUtcDateTime')}"`);
		if (docType.length)
			query.push(`docType=="${docType[0]}"`);
		*/

		query = query.join(';');
		// endregion

		const response = yield call(dataContext.getOrders,
			token,
			(step ? propState.pos + propState.countStep : 0),
			propState.countStep,
			query,
			propState.sortField,
			propState.sortDirection
		);
		yield put(actEnums.getListCheque.success({
			list: response.orders,
			pos: response.pos,
			total_count: response.totalCount,
			noItems: isFirst ? !(response.orders.length) : propState.noItems
		}));
	} catch (error) {
		yield put(notify.error('При загрузке данных произошла ошибка', 'Ошибка'));
		yield put(actEnums.getListCheque.failure());
	}
}


export default function* () {
	yield [
		throttle(300, actEnums.GET_LIST.REQUEST, getListChequeSaga)
	]
}