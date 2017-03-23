import {createHistory} from 'history';
import {reduxReactRouter, routerStateReducer} from 'redux-router';
import {createStore as _createStore, combineReducers, compose} from 'redux';
import DevTools from 'dev/DevTools.jsx';

export default function createStore(middleware, reducers, routes, initionalState) {

	//let createHistory;

	//if (__CLIENT__) {
	//reduxReactRouter = require('redux-router').reduxReactRouter;
	//createHistory = require('history/lib/createBrowserHistory').default;
	//}

	// if (__SERVER__) {
	// 	reduxReactRouter = require('redux-router/server').reduxReactRouter;
	// 	createHistory = require('history/lib/createMemoryHistory');
	// }

	const allReducers = combineReducers({...reducers, ...{router: routerStateReducer}});

	//finalCreateStore = reduxReactRouter({routes, createHistory})(finalCreateStore);
	//finalCreateStore = compose(middleware)(finalCreateStore);


	let finalCreateStore = compose(
		middleware,
		reduxReactRouter({
			createHistory
		}),
		DevTools.instrument()
	)(_createStore);

	const store = finalCreateStore(allReducers, initionalState);
	return store;
}




