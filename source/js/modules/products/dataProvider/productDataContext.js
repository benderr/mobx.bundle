import api from 'infrastructure/api/api'
import {
	toClient,
	toClientProduct,
	toClientImportResult,
	toClientModifierGroup,
	toClientItemGroups
} from './productMapper';

export const getProducts = (retailPointId, start, count, {filter, groupId}) => {
	let params = [];
	if (filter)
		params.push(`:quickSearch="${filter}"`);
	if(groupId)
		params.push(`groupId=="${groupId}"`);
	let q = params.join(';');
	return api.v1().retailpoint(retailPointId).catalog().inventory()
		.get({start, count, q})
		.then(response => toClient(response.data));
};

export const getItemGroups = (retailPointId, start, count, name) => {
	let params = [];
	if (name)
		params.push(`name=="*${name}*"`);
	let q = params.join(';');
	return api.v1().retailpoint(retailPointId).catalog().itemGroups()
		.get({start, count, q})
		.then(response => toClientItemGroups(response.data));
};

export const getModifierGroups = (retailPointId, start, count) => {
	return api.v1().retailpoint(retailPointId).catalog().modifierGroups()
		.get({start, count})
		.then(response => response.data)
		.catch(() => {
			return { //todo доделать
				groupsList: [
					{
						code: '1',
						name: new Date().getTime().toString(),
						modifiers: [
							{
								selected: true,
								name: 'Lol'
							}
						].map((s, i) => ({
							selected: s.selected,
							name: s.name,
							id: i + 1
						}))
					}
				]
			}
		})
};


export const getProduct = (retailPointId, inventCode) => {
	return api.v1().retailpoint(retailPointId).catalog().inventory(inventCode)
		.get().then(response => toClientProduct(response.data));
};

export const saveProduct = (retailPointId, product) => {
	return api.v1().retailpoint(retailPointId).catalog()
		.put(product)
		.then(response => toClientProduct(response.data.catalogEntity));
};

export const removeProduct = (retailPointId, productId) => {
	return api.v1().retailpoint(retailPointId).catalog()
		.inventory(productId)
		.delete()
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