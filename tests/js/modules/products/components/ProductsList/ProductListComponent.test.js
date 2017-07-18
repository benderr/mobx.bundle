/**
 * Created by RobertSabiryanov on 18.07.17.
 */
import React from 'react';
import {shallow} from 'enzyme';
import ProductList from 'modules/products/components/ProductsList/ProductListComponent';

//http://airbnb.io/enzyme/docs/api/
describe('ProductList Tests', () => {
	function getNewProductItem(price = 0) {
		return {
			name: 'Test Item',
			inventCode: (new Date().getTime()).toString(),
			price: price
		}
	}

	test('Empty ProductList', () => {
		const products = [];
		const selectedPoint = '1';
		const loading = false;
		const renderedComponent = shallow(
			<ProductList items={products} openProduct={jest.fn()} selectedPoint={selectedPoint} loadNext={jest.fn()}
						 onFilterChanged={jest.fn()} loading={loading}/>
		);
		// Выведем отрендеренный компонент
		//console.log(renderedComponent.debug());

		expect(renderedComponent.find('div.center_xy').text()).toBe('По запросу ничего не найдено');
	});

	test('Product List with Items', () => {
		const products = [getNewProductItem(), getNewProductItem(1),getNewProductItem(2)];
		const selectedPoint = '1';
		const loading = false;
		const renderedComponent = shallow(
			<ProductList items={products} openProduct={jest.fn()} selectedPoint={selectedPoint} loadNext={jest.fn()}
						 onFilterChanged={jest.fn()} loading={loading}/>
		);
		// Выведем отрендеренный компонент
		//console.log(renderedComponent.debug());

		expect(renderedComponent.find('ProductItem').length).toBe(3);
	});


});
