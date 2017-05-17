import ProductListContainer from './containers/ProductListContainer';
import React from 'react';

export function getRoutes() {
	return {
		products: {
			path: '/',
			index: true,
			exact: true,
			component: ProductListContainer
		},
		product:{
			path:'/product/:id',
			exact: true,
			component: ({location}) => {
				console.log('finance/id render', location);
				return (<h2> I'm Layer</h2>)
			},
			isLayer: true
		}
	};
}