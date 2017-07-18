/**
 * Created by RobertSabiryanov on 18.07.17.
 */
import React from 'react';
import {shallow} from 'enzyme';
import ProductItem from 'modules/products/components/ProductsList/ProductItem';

describe('ProductItem Tests', () => {
	function getNewProductItem(price = 0) {
		return {
			name: 'Test Item',
			inventCode: (new Date().getTime()).toString(),
			price: price
		}
	}
	test('Call openProduct', ()=>{
		const firstProduct = getNewProductItem();
		const selectedPoint = '1';
		const loading = false;
		const openProduct = jest.fn();
		const renderedComponent = shallow(
			<ProductItem item={ firstProduct } key={firstProduct.inventCode}
						 onProductClick={openProduct}/>
		);
		// Выведем отрендеренный компонент
		console.log(renderedComponent.debug());
		renderedComponent.find('div.row_link').simulate('click');
		expect(openProduct).toHaveBeenCalled();

	});
});