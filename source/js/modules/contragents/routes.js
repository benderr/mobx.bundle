import React from 'react';
import ContragentListContainer from './containers/ContragentListContainer';
import ContragentEditContainer from './containers/ContragentEditContainer';

import TestContainer from './containers/TestContainer';

export function getRoutes() {
	return {
		// contragentsTest: {
		// 	path: '/contragents-test',
		// 	exact: true,
		// 	component: TestContainer
		// },
		contragents: {
			path: '/contragents',
			exact: true,
			component: ContragentListContainer
		},
		contragentsEdit: {
			path: '/contragents/:action/:code',
			exact: true,
			isLayer: true,
			layout: ContragentEditContainer
		},
		contragentsAdd: {
			path: '/contragents/:action',
			exact: true,
			isLayer: true,
			layout: ContragentEditContainer
		}
	}
}