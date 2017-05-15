/**
 * Created by RobertSabiryanov on 14.05.17.
 */
import {call, put, takeLatest} from 'redux-saga/effects'
import * as actions from '../enums/actions';
import * as dataContext from '../dataProvider/productDataContext'


function* getProducts({retailPointId, start, count, name, inventCode, price}) {
	try {
		const products = yield call(dataContext.getProducts, retailPointId, start, count, name, inventCode, price);
		yield put(actions.GET_PRODUCTS.SUCCESS, {products});
	}
	catch (e) {
		yield put(actions.GET_PRODUCTS.FAILURE, e.message);
	}
}

export default function*() {
	yield takeLatest(actions.GET_PRODUCTS.REQUEST, getProducts);
}