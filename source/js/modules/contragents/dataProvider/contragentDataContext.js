import api from 'infrastructure/api/api';
import * as mapper from './contragentDataMapper';

/**
 * Список контрагентов
 * GET /api/v1/retail-point/<token>/catalog/CONTRACTOR?q=&sortField=name&sortDirection=asc
 * @param token
 * @param props
 */
export const getListContragent = ({token, ...props}) => {
	return api.v1().retailpoint(token).catalog().contractor()
		.get(mapper.getListContragent.toServer(props))
		.then(response => mapper.getListContragent.toClient(response.data));
};

/**
 * Добавить контрагента
 * POST /api/v1/retail-point/<token>/catalog
 * @param token
 * @param props
 * @returns {*}
 */
export const createContragent = ({token, ...props}) => {
	return api.v1().retailpoint(token).catalog()
		.post(mapper.createContragent(props))
};

/**
 * Обновить контрагента
 * POST /api/v1/retail-point/<token>/catalog
 * @param token
 * @param props
 * @returns {*}
 */
export const updateContragent = ({token, ...props}) => {
	return api.v1().retailpoint(token).catalog()
		.put(mapper.updateContragent(props))
};

/**
 * Удалить контрагента
 * @param token
 * @param code
 */
export const deleteContragent = ({token, code}) => {
	return api.v1().retailpoint(token).catalog().simpleDiscount(code)
		.delete();
};