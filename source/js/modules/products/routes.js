import ProductListContainer from './containers/ProductListContainer';
import EditProductContainer from './containers/EditProductContainer';
import AddProductContainer from './components/EditProductForm/AddProductContainer';
import React from 'react';

export function getRoutes() {
	return {
		products: {
			path: '/',
			index: true,
			exact: true,
			component: ProductListContainer
		},
		product: {
			path: '/product/add',
			exact: true,
			isLayer: true,
			layout: AddProductContainer
		},
		productDetail: {
			path: '/product/:id/:point',
			exact: true,
			isLayer: true,
			layout: AddProductContainer
		}
	};
}