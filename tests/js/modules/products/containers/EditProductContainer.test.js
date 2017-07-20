/**
 * Created by RobertSabiryanov on 18.07.17.
 */
import React from 'react';
import {mount} from 'enzyme';
import {EditProductContainer} from 'modules/products/containers/EditProductContainer';
import configureStore from 'redux-mock-store';
import {fromJS} from 'immutable';
import 'airbnb-js-shims/target/es2015';
import {Provider} from 'react-redux'

jest.mock('modules/products/components/ProductCard/ProductCard');

describe('EditProductContainer tests', () => {
	test('getDetails test', () => {
		//	dependency.default = jest.fn();
		const initialState = fromJS({
			productDetails: {
				productView: {},
				searchProductsResult: {}, //результаты поиска в выпадушке
				searchGroupsResult: {} //результаты поиска группы модификаторов в выпадушке
			}
		});
		const mockStore = configureStore();
		const store = mockStore(initialState);

		const getDetailsMock = jest.fn();
		const inventCode = '123';
		const point = '321';
		const product = {
			name: 'Test Product',
		};
		const props = {
			urlAction: 'view',
			inventCode: inventCode,
			point: point,
			getDetails: getDetailsMock,
			layerId: '123123123',
			onCloseLayer: jest.fn(),
			productView: {product}
		};
		let body = document.body;
		body.innerHTML = '<div class="poss" id="root"></div>';

		const renderedComponent = mount(<Provider store={store}><EditProductContainer {...props}/></Provider>);
		//console.log(renderedComponent.debug());

		expect(getDetailsMock).toBeCalledWith({inventCode, point});
	})
});
