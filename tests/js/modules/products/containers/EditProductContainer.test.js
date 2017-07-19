/**
 * Created by RobertSabiryanov on 18.07.17.
 */
import React from 'react';
import {mount} from 'enzyme'
import EditProductContainer from 'modules/products/containers/EditProductContainer';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {Map, List, fromJS} from 'immutable';
import 'airbnb-js-shims/target/es2015';

// jest.mock('modules/products/selectors/productsSelectors');

describe('EditProductContainer tests', ()=>{
	test('getDetails test',()=>{
		const initialState = Map({
			productDetails: Map({
				productView: Map({}),
				searchProductsResult: Map({}), //результаты поиска в выпадушке
				searchGroupsResult: Map({}) //результаты поиска группы модификаторов в выпадушке
			})
		});
		const mockStore = configureStore();

		const store = mockStore(initialState);
		const props = {
			urlAction: 'view',
			inventCode: '123',
			point: '321',
			getDetails: jest.fn(),
			layerId: '123123123',
			onCloseLayer: jest.fn()
		};
		let body = document.body;
		body.innerHTML = '<div class="poss" id="root"></div>';

		const renderedComponent = mount(<Router><EditProductContainer {...props} store={store}/></Router>);
		console.log(renderedComponent.debug());
	})
});
