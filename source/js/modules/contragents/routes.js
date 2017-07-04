import React from 'react';
import ListComponent from './containers/ListContainer';
import EditComponent from './containers/EditContainer';

export function getRoutes() {
	return {
		contragents: {
			path: '/contragents',
			exact: true,
			component: ListComponent
		},
		contragentsEdit: {
			path: '/contragents/:action/:id',
			exact: true,
			isLayer: true,
			layout: EditComponent
		},
		contragentsAdd: {
			path: '/contragents/:action',
			exact: true,
			isLayer: true,
			layout: EditComponent
		}
	}
}