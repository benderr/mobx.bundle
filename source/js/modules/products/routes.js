import React from 'react';
import ProductListContainer from './containers/ProductListContainer';
import EditProductContainer from './containers/EditProductContainer';
import ProductModifierGroupContainer from './containers/ProductModifierGroupContainer';
import ProductModifierContainer from './containers/ProductModifierContainer';
import ProductExportContainer from './containers/ProductExportContainer';
import ProductImportContainer from './containers/ProductImportContainer';

export function getRoutes() {
	return {
		products: {
			path: '/',
			index: true,
			exact: true,
			component: ProductListContainer
		},
		product: {
			path: '/product/:action/point/:point/code/:inventCode',
			exact: true,
			isLayer: true,
			layout: EditProductContainer
		},
		exportProduct: {
			path: '/products/export',
			exact: true,
			isLayer: true,
			layout: ProductExportContainer
		},
		importProduct: {
			path: '/products/import',
			exact: true,
			isLayer: true,
			layout: ProductImportContainer
		},
		addProduct: {
			path: '/product/:action/point/:point/code/:inventCode',
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