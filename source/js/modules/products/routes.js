import ProductListContainer from './containers/ProductListContainer';
import AddProductContainer from './containers/AddProductContainer';
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
			path: '/product/:point/:id',
			exact: true,
			isLayer: true,
			layout: AddProductContainer
		}
	};
}