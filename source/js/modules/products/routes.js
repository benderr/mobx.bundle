import React from 'react';
import ProductListContainer from './containers/ProductListContainer';
import EditProductContainer from './containers/EditProductContainer';
import ProductModifierGroupContainer from './containers/ProductModifierGroupContainer';
import ProductModifierContainer from './containers/ProductModifierContainer';

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
			path: '/product/:point/:inventCode',
			exact: true,
			isLayer: true,
			layout: EditProductContainer
		},
		productModifierGroup: {
			path: '/product/group',
			exact: true,
			isLayer: true,
			layout: ProductModifierGroupContainer
		},
		productModifier: {
			path: '/product/modifier',
			exact: true,
			isLayer: true,
			layout: ProductModifierContainer
		}
	};
}