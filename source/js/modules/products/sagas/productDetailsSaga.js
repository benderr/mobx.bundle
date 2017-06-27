import {call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';
import {debounce} from 'redux-saga-debounce-effect';
import * as actions from '../enums/actions';
import * as productActions from '../actions/productActions';
import * as dataContext from '../dataProvider/productDataContext';
import {getCurrentRetailPointId} from 'modules/retailPoints/selectors/retailPointSelectors';
import {generateNumber} from 'infrastructure/utils/uuidGenerator';
import {push} from 'connected-react-router';


function* createProduct() {
	const inventCode = generateNumber().toString();
	yield setProductToLayer({inventCode});
	const retailPointId = yield select(getCurrentRetailPointId);
	yield put(push({pathname: `/product/add/point/${retailPointId}/code/${inventCode}`}));
}

function* setProductToLayer({inventCode}) {
	const product = {
		inventCode: inventCode,
		price: null,
		alcoholType: 'NO_ALCOHOL',
		barcode: inventCode,
		minPrice: 0,
		measure: 'pcs',
		vatTag: "0",
		catalogType: 'INVENTORY',
		modifiers: [],
		isNew: true
	};
	yield put(productActions.addProduct({product}));
}

function* getProductDetailsProcess({point, inventCode}) {
	try {
		const product = yield call(dataContext.getProduct, point, inventCode);
		yield put(productActions.getProductDetails.success({product}));
	}
	catch (error) {
		yield put(productActions.getProductDetails.failure({inventCode, error}));
	}
}

function* saveProductDetailsProcess({product, point}) {
	try {
		const saveProduct = product.isNew ? dataContext.addProduct : dataContext.saveProduct;
		const updatedProduct = yield call(saveProduct, point, product);
		yield put(productActions.saveProductDetails.success({product: updatedProduct}));
		if (product.isNew) {
			yield put(productActions.addProductToList({product: updatedProduct}));
		}
		else {
			yield put(productActions.updateProductInList({product: updatedProduct}));
		}
	}
	catch (error) {
		yield put(productActions.saveProductDetails.failure({inventCode: product.inventCode, error}));
	}
}

function* searchProducts({formKey, query}) {
	try {
		const retailPointId = yield select(getCurrentRetailPointId);
		const response = yield call(dataContext.getProducts, retailPointId, 0, 50, query);
		yield put(productActions.searchProducts.success({formKey, products: response.productsList}));
	}
	catch (error) {
		console.log(error);
		yield put(productActions.searchProducts.failure({formKey, error}));
	}
}

function* searchGroups({formKey, query}) {
	try {
		const retailPointId = yield select(getCurrentRetailPointId);
		const response = yield call(dataContext.getModifierGroups, retailPointId, 0, 50, query);
		yield put(productActions.searchGroups.success({formKey, groups: response.groupsList}));
	}
	catch (error) {
		yield put(productActions.searchGroups.failure({formKey, error}));
	}
}

function* removeProduct({point, inventCode}) {
	try {
		yield call(dataContext.removeProduct, point, inventCode);
		yield put(productActions.removeProduct.success({inventCode}));
	}
	catch (error) {
		console.log(error);
		yield put(productActions.removeProduct.failure({inventCode, error}));
	}
}

export default function*() {
	yield [
		takeEvery(actions.GET_PRODUCT_DETAIL.REQUEST, getProductDetailsProcess),
		takeEvery(actions.SAVE_PRODUCT_DETAIL.REQUEST, saveProductDetailsProcess),
		takeEvery(actions.CREATE_PRODUCT, createProduct),
		takeEvery(actions.SET_NEW_PRODUCT, setProductToLayer),
		debounce(actions.SEARCH_PRODUCTS.REQUEST, searchProducts),
		debounce(actions.SEARCH_GROUPS.REQUEST, searchGroups),
		takeEvery(actions.REMOVE_PRODUCT.REQUEST, removeProduct)
	]
}