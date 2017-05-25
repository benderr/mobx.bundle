/**
 * Created by RobertSabiryanov on 14.05.17.
 */
import {call, put, takeLatest, takeEvery} from 'redux-saga/effects'
import * as actions from '../enums/actions';
import * as retailPointsActions from '../../retailPoints/enums/actions';
import {getProductDetails, saveProductDetails, getProducts} from '../actions/productActions'
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
	yield put(actions.RESET_PRODUCTS_LIST);
	yield getProductsProcess({retailPointId: data.id, start: 0, count: 50});
}

function* getProductDetailsProcess({point, inventCode, category}) {
	try {
		const product = yield call(dataContext.getProduct, point, category, inventCode);
		yield put(getProductDetails.success({product}));
	}
	catch (error) {
		yield put(getProductDetails.failure({inventCode, error}));
	}
}

function* saveProductDetailsProcess({product, point}) {
	try {
		const updatedProduct = yield call(dataContext.saveProduct, point, product);
		yield put(saveProductDetails.success({product: updatedProduct}));
	}
	catch (error) {
		yield put(saveProductDetails.failure({inventCode: product.inventCode, error}));
	}
}

export default function*() {
	yield [
		takeEvery(retailPointsActions.SET_RETAIL_POINT, initProductsProcess),
		takeLatest(actions.GET_PRODUCTS.REQUEST, getProductsProcess),
		takeLatest(actions.GET_FILTRED_PRODUCTS.REQUEST, getProductsProcess),
		takeEvery(actions.GET_PRODUCT_DETAIL.REQUEST, getProductDetailsProcess),
		takeEvery(actions.SAVE_PRODUCT_DETAIL.REQUEST, saveProductDetailsProcess)
	]
}