import ProductListContainer from './containers/ProductListContainer';
import EditProductContainer from './containers/EditProductContainer';
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
			layout: EditProductContainer
		},
		productDetail: {
			path: '/product/:point/:code',
			exact: true,
			isLayer: true,
			layout: EditProductContainer
		}
	};
}