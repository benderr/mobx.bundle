import React from 'react';
import ListComponent from './containers/ListContainer';
import EditComponent from './containers/EditContainer';

export function getRoutes() {
	return {
		contragents: {
			path: '/contragents',
			exact: true,
			component: ListComponent
		}
	}
}