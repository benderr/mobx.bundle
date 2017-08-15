import React from 'react';
//import {Route} from 'react-router';
import TestSelector from './components/TestSelector'
import TestSelector2 from './components/TestSelector2'
import TestDrag from './containers/TestDrag'
//import DatePicker2 from './containers/DatePicker2'
import TestSelectorDate from './components/TestSelectorDate'
import TestAmount from './components/TestAmount'
import TestLayers from './containers/TestLayers'
import TestLayer1 from './components/TestLayer1'
import TestLayer2 from './components/TestLayer2'


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
		},
		// testDatePicker2: {
		// 	path: '/test-datepicker2',
		// 	exact: true,
		// 	component: DatePicker2
		// },
		testDate: {
			path: '/testdate',
			exact: true,
			component: TestSelectorDate
		},
		testAmount: {
			path: '/testamount',
			exact: true,
			component: TestAmount
		},
		testLayers: {
			path: '/testlayers',
			exact: true,
			component: TestLayers
		},
		testLayer1: {
			path: '/layer1',
			exact: true,
			isLayer: true,
			layout: TestLayer1
		},
		testLayer2: {
			path: '/layer2',
			exact: true,
			isLayer: true,
			layout: TestLayer2
		},
		testLayer3: {
			path: '/layer3',
			exact: true,
			isLayer: true,
			layout: TestLayer2
		},
		testLayer4: {
			path: '/layer4',
			exact: true,
			isLayer: true,
			layout: TestLayer2
		},
		testLayer5: {
			path: '/layer5',
			exact: true,
			isLayer: true,
			layout: TestLayer2
		}
	}
}