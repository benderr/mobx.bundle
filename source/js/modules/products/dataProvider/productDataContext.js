/**
 * Created by RobertSabiryanov on 14.05.17.
 */
import api from 'infrastructure/api/api'
import {toClient} from './productMapper';

export const getProducts = (retailPointId, start, count, name, inventCode, price) => {
	let q = {name, inventCode, price};
	return api().v1().retailpoint(retailPointId).get({start, count, q})
		// .catalog().inventory()
		// .get({start, count, q})
		// .then(response => toClient(response.data));
}
