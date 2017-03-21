import {createHistory} from 'history';
import {reduxReactRouter, routerStateReducer} from 'redux-router';
import {createStore as _createStore, combineReducers, compose} from 'redux';

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


	//const store = finalCreateStore(combineReducers(reducers), initionalState);


	const store = compose(
		middleware,
		reduxReactRouter({
			createHistory
		})
	)(_createStore)(allReducers, initionalState);


	return store;
}




