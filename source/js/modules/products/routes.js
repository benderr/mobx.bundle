import ProductListContainer from './containers/ProductListContainer';
import EditProductContainer from './containers/EditProductContainer';
import AddProductLayout from './components/EditProductForm/AddProductLayout';
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
			component: EditProductContainer,
			isLayer: true,
			layout: AddProductLayout
		}
	};
}