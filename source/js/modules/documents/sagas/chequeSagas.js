import {call, put, select, throttle, all} from 'redux-saga/effects'
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors'
import {notify} from 'common/uiElements/Notify'

import * as actEnums from '../actions/chequeActions'
import * as dataContext from '../dataProvider/dataContext'
import {getListPropsState} from '../selectors/chequeSelectors'
import dateHelper from 'common/helpers/dateHelper'
import {DOCUMENT_TYPE} from '../enums'

function* getListChequeSaga({isFirst = false, step = false}) {
	try {
		const token = yield select(getCurrentRetailPointId);
		const propState = yield select(getListPropsState);

		// region: query params
		let query = [];
		const {dateFrom, dateTo, docType, q} = propState.filter;

		if (q && q.length) {
			query.push(`:quickSearch="${q}"`);
		}

		if (dateFrom instanceof Date) {
			query.push(`beginDateTime=ge="${dateHelper.dateFormat(dateFrom, 'isoUtcDateTime')}"`);
		}
		if (dateTo instanceof Date) {
			query.push(`beginDateTime=le="${dateHelper.dateFormat(dateTo, 'isoUtcDateTime')}"`);
		}
		if (docType) {
			const docTypes = docType == DOCUMENT_TYPE.RETURN ?
				[DOCUMENT_TYPE.RETURN, DOCUMENT_TYPE.RETURN_BY_SALE] : [DOCUMENT_TYPE.SALE];

			query.push(`docType=in=(${docTypes.join(',')})`)
		}

		query.push('shift.id!=":external"');	// Для теста: 'shift.id==":external"'
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
			noItems: isFirst ? !(response.orders.length) : propState.noItems,
			filter: propState.filter
		}));
	} catch (error) {
		yield put(notify.error('При загрузке данных произошла ошибка', 'Ошибка'));
		logger.log(error);
		yield put(actEnums.getListCheque.failure());
	}
}


export default function*() {
	yield all([
		throttle(300, actEnums.GET_LIST.REQUEST, getListChequeSaga)
	])
}