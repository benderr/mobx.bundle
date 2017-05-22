/**
 * Created by RobertSabiryanov on 14.05.17.
 */
import {call, put, takeLatest, takeEvery} from 'redux-saga/effects'
import * as actions from '../enums/actions';
import * as retailPointsActions from '../../retailPoints/enums/actions';
import {getProducts} from '../actions/productActions'
import * as dataContext from '../dataProvider/productDataContext'


function* getProductsProcess({retailPointId, start, count, filter}) {
	try {
		const response = yield call(dataContext.getProducts, retailPointId, start, count, filter);
		yield put(getProducts.success(response));
	}
	catch (e) {
		yield put(getProducts.failure(e));
	}
}

function* initProductsProcess(data) {
	yield getProductsProcess({retailPointId: data.id, start: 0, count: 50});
}


export default function*() {
	yield [
		takeEvery(retailPointsActions.SET_RETAIL_POINT, initProductsProcess),
		takeLatest(actions.GET_PRODUCTS.REQUEST, getProductsProcess),
		takeLatest(actions.GET_FILTRED_PRODUCTS.REQUEST, getProductsProcess),
	]
}