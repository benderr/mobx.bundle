import React from 'react';
//import {Route} from 'react-router';
import TestSelector from 'components/TestSelector'
import TestSelector2 from 'components/TestSelector2'
import TestDrag from './containers/TestDrag'

export function getRoutes() {
	return {
		testSelect: {
			path: '/testselect',
			exact: true,
			allowAnonymous: true,
			component: TestSelector
		},
		testSelect2: {
			path: '/testselect2',
			exact: true,
			allowAnonymous: true,
			component: TestSelector2
		},
		testDrag: {
			path: '/drag',
			exact: true,
			allowAnonymous: true,
			component: TestDrag
		}
	}
}