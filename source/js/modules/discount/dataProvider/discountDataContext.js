import api from 'infrastructure/api/api'
import * as mapper from './discountMapper'

/**
 * Список скидок
 * @url GET /api/v1/retail-point/<token>/catalog/SIMPLE_DISCOUNT?q=&sortField=name&sortDirection=asc
 * @param token
 * @param props
 */
export const getListDiscount = ({token, ...props}) => {
	return api.v1().retailpoint(token).catalog().simpleDiscount()
		.get(mapper.listDiscount.toServer(props))
		.then((response) => mapper.listDiscount.toClient(response.data));
};

/**
 * Дабавляет новую скидку
 * @url POST /api/v1/retail-point/<token>/catalog
 * @param token
 * @param props
 */
export const createDiscount = ({token, ...props}) => {
	return api.v1().retailpoint(token).catalog()
		.post(mapper.createDiscount(props));
};

/**
 * Обновляет существующею скидку
 * @url PUT /api/v1/retail-point/<token>/catalog
 * @param token
 * @param props
 */
export const updateDiscount = ({token, ...props}) => {
	return api.v1().retailpoint(token).catalog()
		.put(mapper.updateDiscount(props));
};

/**
 * Удаляет скидку по коду
 * @url DELETE /api/v1/retail-point/<token>/catalog/SIMPLE_DISCOUNT/944825461
 * @param token
 * @param code
 */
export const deleteDiscount = ({token, code}) => {
	return api.v1().retailpoint(token).catalog().simpleDiscount(code)
		.delete();
};