import api from 'infrastructure/api/api';
import * as mapper from './contragentDataMapper';

/**
 * Список контрагентов
 * @returns {*}
 */
export function getList({token, q, column, orderBy, start}) {


	return api.v1().retailpoint(token).catalog().contractor()
		.get(mapper.getListContragent.toServer({q, column, orderBy, start}))
		.then((response) => mapper.getListContragent.toClient(response.data));
}

export function create({token, contragent}) {
	return api.v1().retailpoint(token).catalog()
		.post(mapper.createContragent.toServer(contragent));
}

export function update() {

}