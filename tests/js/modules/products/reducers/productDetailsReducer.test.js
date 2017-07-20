/**
 * Created by RobertSabiryanov on 12.07.17.
 */
import {fromJS} from 'immutable';
import * as productsReducer from 'modules/products/reducers/productsReducer';
import * as actionEnums from 'modules/products/enums/actions'


describe('productsReducer', () => {
	test('default state', () => {
		let expectedState = fromJS({
			loading: true,
			error: null,
			productsList: [],
			productListTotalCount: 0,
			noProducts: false
		});
		let initialState = productsReducer.initialState;
		expect(initialState.get('productsList') === expectedState.get('productsList')).toBeTruthy();
	});
	let getProductItem = (code) => {
		const barCode = code || new Date().getTime();
		return {
			accountingQuantity: null,
			additionalPrices: null,
			alcVolume: null,
			alcoholType: null,
			articul: null,
			barcode: null,
			barcodes: null,
			defaultQuantity: null,
			deptCode: null,
			extendedOptions: null,
			groupId: null,
			inventCode: barCode,
			inventGroup: null,
			isService: null,
			measure: null,
			minPrice: null,
			name: 'Test product item',
			optionalModifiers: null,
			optionalNoModifiers: null,
			options: null,
			packCapacity: null,
			packingMode: null,
			price: null,
			printText: null,
			productVCode: null,
			remainDate: null,
			remainInStock: null,
			requiredModifiers: null,
			modifiers: null,
			sellRestrictPeriods: null,
			shortName: null,
			vatTag: null,
			volume: null,
			catalogType: null || ''
		}
	};


	test('GET_PRODUCTS.SUCCESS', () => {
		let productsList = [getProductItem(), getProductItem()];
		let initialState = productsReducer.initialState;
		let result = productsReducer.actionHandlers[actionEnums.GET_PRODUCTS.SUCCESS](initialState, {response : {productsList}});
		expect(result.get('loading')).toBeFalsy();
		expect(result.get('productsList').size).toBe(2);

	});

	test('REMOVE_PRODUCT.SUCCESS', () => {
		let productsList = [getProductItem(123), getProductItem()];
		let initialState = productsReducer.initialState;
		initialState = initialState.setIn(['productsList'], fromJS(productsList));

		let result = productsReducer.actionHandlers[actionEnums.REMOVE_PRODUCT.SUCCESS](initialState, {inventCode : 123});
		expect(result.get('productsList').size).toBe(1);
	})

	//https://github.com/astorije/chai-immutable
	//можно использовать эту библиотеку для тестирования Immutable

});

