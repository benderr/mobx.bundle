import {call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';
import {debounce} from 'redux-saga-debounce-effect';
import * as actions from '../enums/actions';
import * as retailPointsActions from '../../retailPoints/enums/actions';
import * as productActions from '../actions/productActions';
import * as dataContext from '../dataProvider/productDataContext';
import {getPointId} from 'modules/core/selectors';

function* getProductsProcess({retailPointId, start, count, filter, initialRequest = false}) {
	try {
		const response = yield call(dataContext.getProducts, retailPointId, start, count, {filter});
		yield call(dataContext.getProducts, retailPointId, start, count, {
			groupId: "8fe4308a-a165-4bb7-ba61-b988d5386b03"
		});
		yield put(productActions.getProducts.success(response, initialRequest));
	}
	catch (e) {
		yield put(productActions.getProducts.failure(e));
	}
}

function* initProductsProcess({id}) {
	yield put(productActions.resetProductsList());
	yield getProductsProcess({retailPointId: id, start: 0, count: 50, initialRequest: true});
}


function* importProducts({file}) {
	try {
		const response = yield call(dataContext.uploadProducts, file);
		yield put(productActions.uploadImportProducts.success({response}));
		const retailPointId = yield select(getPointId);
		yield initProductsProcess({id: retailPointId});
	}
	catch (error) {
		yield put(productActions.uploadImportProducts.failure({error}));
	}
}

export default function*() {
	yield [
		takeEvery(retailPointsActions.SET_RETAIL_POINT, initProductsProcess),
		takeLatest(actions.GET_PRODUCTS.REQUEST, getProductsProcess),
		debounce(actions.GET_FILTRED_PRODUCTS.REQUEST, getProductsProcess),
		takeEvery(actions.IMPORT_PRODUCTS.REQUEST, importProducts)
	]
}