/**
 * Created by RobertSabiryanov on 14.05.17.
 */
import api from 'infrastructure/api/api'
import {toClient} from './productMapper';

export const getProducts = (retailPointId, start, count, filter) => {
	let params = [];
	if (filter)
		params.push(`name=="*${filter}*"`);
	let q = params.join(';');
	return api.v1().retailpoint(retailPointId).catalog().inventory()
		.get({start, count, q})
		.then(response => toClient(response.data));
};
