import {call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';
import {debounce} from 'redux-saga-debounce-effect';
import * as actions from '../enums/actions';
import * as retailPointsActions from '../../retailPoints/enums/actions';
import * as productActions from '../actions/productActions';
import * as dataContext from '../dataProvider/productDataContext';
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors';
import {generateNumber} from 'infrastructure/utils/uuidGenerator';
import {push} from 'connected-react-router';

function* getProductsProcess({retailPointId, start, count, filter}) {
	try {
		const response = yield call(dataContext.getProducts, retailPointId, start, count, filter);
		yield put(productActions.getProducts.success(response));
	}
	catch (e) {
		yield put(productActions.getProducts.failure(e));
	}
}

function* initProductsProcess(data) {
	yield put(productActions.resetProductsList());
	yield getProductsProcess({retailPointId: data.id, start: 0, count: 50});
}


function* importProducts({file}) {
	try {
		const response = yield call(dataContext.uploadProducts, file);
		yield put(productActions.uploadImportProducts.success({response}));
	}
	catch (error) {
		console.log(error);
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