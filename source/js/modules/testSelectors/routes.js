import React from 'react';
//import {Route} from 'react-router';
import TestSelector from 'components/TestSelector'
import TestDrag from './containers/TestDrag'
export function getRoutes() {
	return {
		testSelect: {
			path: '/testselect',
			exact: true,
			allowAnonymous: true,
			component: TestSelector
		},
		testDrag: {
			path: '/drag',
			exact: true,
			allowAnonymous: true,
			component: TestDrag
		}
	}
}