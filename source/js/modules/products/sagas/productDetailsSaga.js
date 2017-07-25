import {call, put, takeEvery, select} from 'redux-saga/effects'
import {debounce} from 'redux-saga-debounce-effect'
import * as actions from '../enums/actions'
import * as productActions from '../actions/productActions'
import * as modifierActions from '../actions/modifierActions'
import * as dataContext from '../dataProvider/productDataContext'
import {getPointId} from 'modules/core/selectors'
import {generateNumber} from 'infrastructure/utils/uuidGenerator'
import {push} from 'connected-react-router'
import {notify} from 'common/uiElements/Notify'
import createSearchProductsSaga from 'modules/core/sagas/createSearchProductsSaga'
import logger from 'infrastructure/utils/logger'
import CATALOG_TYPE from '../enums/catalogType'

function* createProduct() {
	const inventCode = generateNumber().toString();
	yield setProductToLayer({inventCode});
	const retailPointId = yield select(getPointId);
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
		catalogType: CATALOG_TYPE.INVENTORY,
		modifiers: [],
		isNew: true
	};
	yield put(productActions.addProduct({product}));
}

function* getProductDetails({point, inventCode}) {
	try {
		const product = yield call(dataContext.getProduct, point, inventCode);
		const modifierGroups = yield call(dataContext.getModifierGroupsByProduct, point, inventCode);
		yield put(modifierActions.setProductModifierGroups({groups: modifierGroups}));
		yield put(productActions.getProductDetails.success({product}));
	}
	catch (error) {
		logger.log(error);
		yield put(productActions.getProductDetails.failure({inventCode, error}));
	}
}

export function* saveProductDetailsProcess({product, point}) {
	try {
		product.separateModifiers = true;
		const saveProduct = product.isNew ? dataContext.addProduct : dataContext.saveProduct;
		const updatedProduct = yield call(saveProduct, point, product);
		yield put(productActions.saveProductDetails.success({product: updatedProduct}));
		if (product.isNew) {
			yield put(productActions.addProductToList({product: updatedProduct}));
		}
		else {
			yield put(productActions.updateProductInList({product: updatedProduct}));
		}
		yield put(notify.success('Данные успешно сохранены'));
	}
	catch (error) {
		yield put(notify.error('Не удалось сохранить товар'));
		yield put(productActions.saveProductDetails.failure({inventCode: product.inventCode, error}));
	}
}

function* removeProduct({point, inventCode}) {
	try {
		yield call(dataContext.removeProduct, point, inventCode);
		yield put(productActions.removeProduct.success({inventCode}));
	}
	catch (error) {
		yield put(productActions.removeProduct.failure({inventCode, error}));
	}
}

const searchProduct = createSearchProductsSaga(actions.SEARCH_PRODUCTS);

export default function*() {
	yield [
		takeEvery(actions.GET_PRODUCT_DETAIL.REQUEST, getProductDetails),
		takeEvery(actions.SAVE_PRODUCT_DETAIL.REQUEST, saveProductDetailsProcess),
		takeEvery(actions.CREATE_PRODUCT, createProduct),
		takeEvery(actions.SET_NEW_PRODUCT, setProductToLayer),
		searchProduct,
		takeEvery(actions.REMOVE_PRODUCT.REQUEST, removeProduct),
	]
}