/**
 * Created by RobertSabiryanov on 18.07.17.
 */
import {Map, List, fromJS} from 'immutable';

const productsSelectors = jest.genMockFromModule('modules/products/selectors/productsSelectors');

productsSelectors.getProductDetailSection= ()=>{
	return Map({
		productView: Map({}),
		searchProductsResult: Map({}), //результаты поиска в выпадушке
		searchGroupsResult: Map({}) //результаты поиска группы модификаторов в выпадушке
	})
}
module.exports = productsSelectors;