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

export function getOrder(retailPointId, shiftType, orderId) {
	return api.v1().retailpoint(retailPointId)
		.shift(shiftType).cashdoc(orderId).get()
		.then(response => mapper.toClientOrder(response.data));
}


export function saveOrder(retailPointId, shiftType, order) {
	return api.v1().retailpoint(retailPointId).shift(shiftType).cashdoc()
		.post(order);
}

export function getShopDocuments(retailPointId, start, count, q, sortField, sortDirection) {
	return api.fn().v1().retailpoint(retailPointId).docs()
		.get({start, count, q, sortField, sortDirection})
		.then(response => {
			return {
				documents: (response.data.data || []).map(mapper.toClientDocumentFromList),
				pos: response.data.pos,
				totalCount: response.data.total_count
			}
		});
}

export function getShopDocumentDetail(retailPointId, id) {
	return api.fn().v1().retailpoint(retailPointId).docs(id)
		.get()
		.then(response => mapper.toClientDocumentDetails(response.data));
}

export function requeueDocument(retailPointId, id) {
	return api.fn().v1().retailpoint(retailPointId)
		.docs(id).requeue().post();
}
