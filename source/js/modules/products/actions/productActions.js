import * as actions from '../enums/actions';
import {createAction} from 'infrastructure/helpers/actionHelpers';

export const getProducts = {
	request: (retailPointId, start, count, filter, sort) => createAction(actions.GET_PRODUCTS.REQUEST, {
		retailPointId,
		start,
		count,
		filter,
		sort
	}),
	requestWithFilter: (retailPointId, start, count, filter, sort) => createAction(actions.GET_FILTRED_PRODUCTS.REQUEST, {
		retailPointId,
		start,
		count,
		filter,
		sort
	}),
	success: (response) => createAction(actions.GET_PRODUCTS.SUCCESS, {response}),
	failure: (error) => createAction(actions.GET_PRODUCTS.FAILURE, {error})
};

export const getProductDetails = {
	request: ({inventCode, point}) => createAction(actions.GET_PRODUCT_DETAIL.REQUEST, {
		inventCode,
		point
	}),
	success: ({product}) => createAction(actions.GET_PRODUCT_DETAIL.SUCCESS, {product}),
	failure: ({inventCode, error}) => createAction(actions.GET_PRODUCT_DETAIL.FAILURE, {inventCode, error})
};


export const saveProductDetails = {
	request: ({point, product}) => createAction(actions.SAVE_PRODUCT_DETAIL.REQUEST, {
		point,
		product
	}),
	success: ({product}) => createAction(actions.SAVE_PRODUCT_DETAIL.SUCCESS, {product}),
	failure: ({inventCode, error}) => createAction(actions.SAVE_PRODUCT_DETAIL.FAILURE, {inventCode, error})
};

export const removeProduct = {
	request: ({point, inventCode}) => createAction(actions.REMOVE_PRODUCT.REQUEST, {
		point,
		inventCode
	}),
	success: ({point, inventCode}) => createAction(actions.REMOVE_PRODUCT.SUCCESS, {point, inventCode}),
	failure: ({inventCode, point, error}) => createAction(actions.REMOVE_PRODUCT.FAILURE, {inventCode, point, error})
};

export const addProductToList = ({product}) => createAction(actions.ADD_PRODUCT_TO_LIST, {product});
export const updateProductInList = ({product}) => createAction(actions.UPDATE_PRODUCT_IN_LIST, {product});

export const saveModifierGroup = ({inventCode, group}) => createAction(actions.SAVE_MODIFIER_GROUP, {
	inventCode,
	group
});

export const removeModifierGroup = ({inventCode, groupId}) => createAction(actions.REMOVE_MODIFIER_GROUP, {
	inventCode,
	groupId
});

export const saveModifier = ({inventCode, groupId, modifier}) => createAction(actions.SAVE_MODIFIER, {
	inventCode,
	groupId,
	modifier
});

export const removeModifier = ({inventCode, groupId, modifierId}) => createAction(actions.REMOVE_MODIFIER, {
	inventCode,
	groupId,
	modifierId
});

export const searchProducts = {
	request: ({formKey, query}) => createAction(actions.SEARCH_PRODUCTS.REQUEST, {formKey, query}),
	success: ({formKey, products}) => createAction(actions.SEARCH_PRODUCTS.SUCCESS, {formKey, products}),
	failure: ({formKey, error}) => createAction(actions.SEARCH_PRODUCTS.FAILURE, {formKey, error})
};

export const setDefaultSearchProduct = ({formKey, defaultsProduct}) => createAction(actions.SET_DEFAULT_SEARCH_PRODUCT, {
	formKey,
	defaultsProduct
});

export const resetProductsList = () => createAction(actions.RESET_PRODUCTS_LIST);
export const addProduct = ({product}) => createAction(actions.ADD_PRODUCT_DETAIL, {product});

export const createProduct = () => createAction(actions.CREATE_PRODUCT);
export const setNewProduct = ({inventCode}) => createAction(actions.SET_NEW_PRODUCT, {inventCode});

export const uploadImportProducts = {
	request: ({file}) => createAction(actions.IMPORT_PRODUCTS.REQUEST, {file}),
	success: ({response}) => createAction(actions.IMPORT_PRODUCTS.SUCCESS, {response}),
	failure: ({error}) => createAction(actions.IMPORT_PRODUCTS.FAILURE, {error})
};

export const resetImportProducts = () => createAction(actions.RESET_IMPORT_LIST);

