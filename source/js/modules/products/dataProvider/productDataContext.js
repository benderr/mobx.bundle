import api from 'infrastructure/api/api'
import {toClient, toClientProduct, toClientImportResult} from './productMapper';

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

export const addProduct = (retailPointId, product) => {
	return api.v1().retailpoint(retailPointId).catalog()
		.post(product)
		.then(response => toClientProduct(response.data.catalogEntity));
};

export const uploadProducts = (file) => {
	const headers = {'Skip-Content-Type': true};
	const data = new FormData();
	data.append('file', file);

	return api.v1().uploadCatalog()
		.post(data, headers)
		.then(response => toClientImportResult(response.data));
};