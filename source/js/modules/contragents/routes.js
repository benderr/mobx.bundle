import React from 'react';
import TestContainer from './containers/TestContainer';
import ListContainer from './containers/ListContainer';
import EditContainer from './containers/EditContainer';

export function getRoutes() {
	return {
		contragentsTest: {
			path: '/contragents-test',
			exact: true,
			component: TestContainer
		},
		contragents: {
			path: '/contragents',
			exact: true,
			component: ListContainer
		},
		contragentsEdit: {
			path: '/contragents/:action/:id',
			exact: true,
			isLayer: true,
			layout: EditContainer
		},
		contragentsAdd: {
			path: '/contragents/:action',
			exact: true,
			isLayer: true,
			layout: EditContainer
		}
	}
}