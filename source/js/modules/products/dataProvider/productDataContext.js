/**
 * Created by RobertSabiryanov on 14.05.17.
 */
import api from 'infrastructure/api/api'
import {toClient, toClientProduct} from './productMapper';

export const getProducts = (retailPointId, start, count, filter) => {
	let params = [];
	if (filter)
		params.push(`:quickSearch="${filter}"`);
	let q = params.join(';');

	return api.v1().retailpoint(retailPointId).catalog().inventory()
		.get({start, count, q})
		.then(response => toClient(response.data));
};

export const getProduct = (retailPointId, catalogType = 'INVENTORY', inventCode) => {
	return api.v1().retailpoint(retailPointId).catalog([catalogType, inventCode])
		.get().then(response => toClientProduct(response.data));
};

export const saveProduct = (retailPointId, product) => {
	return api.v1().retailpoint(retailPointId).catalog()
		.put(product)
		.then(response => toClientProduct(response.data.catalogEntity));
};