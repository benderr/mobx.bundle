import {createStore as _createStore, combineReducers, compose} from 'redux';

export default function createStore({middleware, reducers, routes, initionalState, sagaMiddleware, sagas}) {

	//let createHistory;

	//if (__CLIENT__) {
	//reduxReactRouter = require('redux-router').reduxReactRouter;
	//createHistory = require('history/lib/createBrowserHistory').default;
	//}

	// if (__SERVER__) {
	// 	reduxReactRouter = require('redux-router/server').reduxReactRouter;
	// 	createHistory = require('history/lib/createMemoryHistory');
	// }

	const allReducers = combineReducers({...reducers});

	//finalCreateStore = reduxReactRouter({routes, createHistory})(finalCreateStore);
	//finalCreateStore = compose(middleware)(finalCreateStore);

	let finalCreateStore = compose(
		...middleware
	)(_createStore);

	const store = finalCreateStore(allReducers, initionalState);

	const rootSaga = function*() {
		yield sagas;
	};

	sagaMiddleware.run(rootSaga);

	return store;
}




