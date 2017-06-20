import React from 'react';
import ProductListContainer from './containers/ProductListContainer';
import EditProductContainer from './containers/EditProductContainer';
import ProductModifierGroupContainer from './containers/ProductModifierGroupContainer';
import ProductModifierContainer from './containers/ProductModifierContainer';
import ProductExportContainer from './containers/ProductExportContainer';
import ProductImportContainer from './containers/ProductImportContainer';
import TestSelector from 'components/TestSelector'

export function getRoutes() {
	return {
		products: {
			path: '/',
			index: true,
			exact: true,
			component: ProductListContainer
		},
		testSelect: {
			path: '/testselect',
			exact: true,
			allowAnonymous: true,
			component: TestSelector
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