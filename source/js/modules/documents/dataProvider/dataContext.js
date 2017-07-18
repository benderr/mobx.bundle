import api from 'infrastructure/api/api'

export function getOrders(retailPointId, start, count, q, sortField, sortDirection) {
	return api.v1().retailpoint(retailPointId).cashdocs()
		.get({start, count, q, sortField, sortDirection})
		.then(response => {
			return {
				orders: response.data.data,
				pos: response.data.pos,
				totalCount: response.data.total_count
			}
		});
}