import api from 'infrastructure/api/api';
import * as mapper from './contragentDataMapper';

/**
 * Список контрагентов
 * @returns {*}
 */
export function getList({token, q, column, orderBy, start}) {
	let params = {};

	if (q) params.q = q;
	if (column) params.sortField = column;
	if (orderBy) params.sortDirection = orderBy;
	if (start) params.start = start;

	return api.v1().retailpoint(token).catalog().contractor().get(params)
		.then((response) => mapper.toClientContragent(response.data));
}