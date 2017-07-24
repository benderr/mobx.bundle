import api from 'infrastructure/api/api'
import * as mapper from './dataMapper';

export function getOrders(retailPointId, start, count, q, sortField, sortDirection) {
	return api.v1().retailpoint(retailPointId).cashdocs()
		.get({start, count, q, sortField, sortDirection})
		.then(response => {
			return {
				orders: (response.data.data || []).map(mapper.toClientOrder),
				pos: response.data.pos,
				totalCount: response.data.total_count
			}
		});
}

export function saveOrder(retailPointId, shiftType, order) {
	return api.v1().retailpoint(retailPointId).shift(shiftType).cashdoc()
		.post(order);
}