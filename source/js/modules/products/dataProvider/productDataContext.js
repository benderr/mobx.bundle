/**
 * Created by RobertSabiryanov on 14.05.17.
 */
import api from 'infrastructure/api/api'
import {toClient} from './productMapper';

export const getProducts = (retailPointId, start, count, name, inventCode, price) => {
	let params = [];
	if (name)
		params.push(`name=="*${name}"`);
	if (inventCode)
		params.push(`inventCode=="*${inventCode}*"`);
	if (price)
		params.push(`price=="${price}"`);
	let q = params.join(';');
	return api.v1().retailpoint(retailPointId).catalog().inventory()
		.get({start, count, q})
		.then(response => toClient(response.data));
};
