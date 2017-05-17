/**
 * Created by RobertSabiryanov on 14.05.17.
 */
import {call, put, takeLatest} from 'redux-saga/effects'
import * as actions from '../enums/actions';
import {getProducts} from '../actions/productActions'
import * as dataContext from '../dataProvider/productDataContext'


function* getProductsProcess({retailPointId, start, count, name, inventCode, price}) {
	try {
		const response = yield call(dataContext.getProducts, retailPointId, start, count, name, inventCode, price);
		yield put(getProducts.success(response));
	}
	catch (e) {
		yield put(getProducts.failure(e));
	}
}

export default function*() {
	yield takeLatest(actions.GET_PRODUCTS.REQUEST, getProductsProcess);
}