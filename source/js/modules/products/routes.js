import ProductListContainer from './containers/ProductListContainer';
import React from 'react';

export function getRoutes() {
	return {
		products: {
			path: '/',
			index: true,
			exact: true,
			component: ProductListContainer
		}
	};
}