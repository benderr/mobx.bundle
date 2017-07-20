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


export const createContragent = ({token, ...props}) => {
	return api.v1().retailpoint(token).catalog()
		.post(mapper.createUpdateToServerr(props));
};

export const updateContragent = ({token, ...props}) => {
	return api.v1().retailpoint(token).catalog()
		.put(mapper.createUpdateToServerr(props));
};

export const deleteContragent = ({token, code}) => {
	console.log({token, code});
	return api.v1().retailpoint(token).catalog().contractor(code)
		.delete();
};