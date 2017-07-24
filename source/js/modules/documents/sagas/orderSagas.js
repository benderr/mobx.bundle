import {call, put, select, take, fork, takeEvery, takeLatest} from 'redux-saga/effects'
import subscribeToUrl from 'modules/core/sagas/subscribeToUrl'
import * as actions from '../actions/orderActions'
import * as selectors from '../selectors/orderSelectors'
import {getPointId} from 'modules/core/selectors'
import {notify} from 'common/uiElements/Notify';
import * as dataContext from '../dataProvider/dataContext'
import logger from 'infrastructure/utils/logger'
import createSearchProductsSaga from 'modules/core/sagas/createSearchProductsSaga';
import {SHIFT_TYPE} from '../enums'
import {uuid} from 'infrastructure/utils/uuidGenerator'
import {debounce} from 'redux-saga-debounce-effect'

function* init() {
	yield takeLatest(actions.CREATE_ORDER.REQUEST, createOrder);
	yield takeEvery(actions.GET_ORDERS.REQUEST, getOrders);
	yield fork(debounceSearchOrders);
}

function* debounceSearchOrders() {
	yield debounce(actions.SEARCH_ORDERS, getOrders);
}

function* createOrder({order, products}) {
	if (!products || products.length == 0) {
		yield put(notify.error('Добавьте продукты'));
		yield put(actions.createOrder.failure({error: 'Добавьте продукты'}));
	} else {
		try {
			const document = {};
			const actualSum = yield select(selectors.getFormTotalSum);
			const retailPointId = yield select(getPointId);

			document.id = uuid();
			document.actualSum = actualSum;
			document.baseSum = actualSum;
			document.beginDateTime = order.beginDateTime;
			document.docType = order.docType;
			document.status = order.status;
			document.docNum = order.docNum;
			document.description = order.description;
			document.inventPositions = products;

			yield call(dataContext.saveOrder, retailPointId, SHIFT_TYPE.EXTERNAL, document);
			yield put(actions.createOrder.success({order: document}));
		} catch (error) {
			yield put(actions.createOrder.failure({error}));
		}
	}
}

function* getOrders() {
	try {
		let filterModel = yield select(selectors.getOrdersFilter);
		const {filter, start, count, sortField, sortDirection, totalCount:total}=filterModel.toJS();

		const retailPointId = yield select(getPointId);
		let q = ['shift.id==":external"'];
		if (filter) {
			q.push(`docNum=="*${filter}*"`)
		}

		q = q.join(';');

		const {pos, totalCount, orders} = yield call(dataContext.getOrders, retailPointId, start, count, q, sortField, sortDirection);
		yield put(actions.getOrders.success({pos, totalCount, orders}));
		yield put(actions.correctFilter({pos}));
	}
	catch (error) {
		logger.log(error);
		yield put(actions.getOrders.failure({error}));
	}
}

const searchProduct = createSearchProductsSaga(actions.SEARCH_PRODUCTS);

export default function*() {
	yield [
		//fork(subscribeToUrl, ['/documents/external', '/documents/external/add'], init),
		fork(init),
		searchProduct
	]
}