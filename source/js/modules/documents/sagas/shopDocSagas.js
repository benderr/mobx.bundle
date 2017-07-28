import {call, put, select, take, fork, takeEvery, takeLatest} from 'redux-saga/effects'
import * as actions from '../actions/shopDocsActions'
import * as selectors from '../selectors/shopDocsSelectors'
import {getPointId} from 'modules/core/selectors'
import * as dataContext from '../dataProvider/dataContext'
import logger from 'infrastructure/utils/logger'
import {SHIFT_TYPE} from '../enums'
import {debounce} from 'redux-saga-debounce-effect'

function* init() {
	yield takeEvery(actions.GET_DOCUMENTS.REQUEST, getDocuments);
	yield takeEvery(actions.GET_DOCUMENT_DETAILS.REQUEST, getDocumentsDetails);
	yield fork(debounceSearchDocuments);
}

function* debounceSearchDocuments() {
	yield debounce(actions.SEARCH_DOCUMENTS, getDocuments);
}

function* getDocuments() {
	try {
		let filterModel = yield select(selectors.getFilter);
		const {filter, start, count, sortField, sortDirection, totalCount:total}=filterModel.toJS();

		const retailPointId = yield select(getPointId);
		let q = [];
		if (filter && filter.query) {
			q.push(`docNum=="*${filter.query}*"`); //переделать на quickSearch
		}

		q = q.join(';');

		const {pos, totalCount, documents} = yield call(dataContext.getShopDocuments, retailPointId, start, count, q, sortField, sortDirection);
		yield put(actions.getDocuments.success({pos, totalCount, documents}));
		yield put(actions.correctFilter({pos}));
	}
	catch (error) {
		logger.log(error);
		yield put(actions.getDocuments.failure({error}));
	}
}

function* getDocumentsDetails({point, id}) {
	try {

		const document = yield call(dataContext.getShopDocumentDetail, point, id);
		if (document) {
			yield put(actions.getDocumentDetails.success({document}));
		}
		else {
			yield put(actions.getDocumentDetails.failure({id, error: 'Документ не найден'}));
		}
	}
	catch (error) {
		logger.log(error);
		yield put(actions.getDocumentDetails.failure({id, error}));
	}
}

export default function*() {
	yield [
		fork(init)
	]
}