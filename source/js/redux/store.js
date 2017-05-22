import {createStore, compose} from 'redux';
import { createBrowserHistory } from 'history' //todo добавить в package?
import { connectRouter } from 'connected-react-router/immutable'
import { combineReducers } from 'redux-immutable';

export default function ({middleware, reducers, initionalState, sagaMiddleware, sagas, history}) {

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
	)(createStore);

	const store = finalCreateStore(connectRouter(history)(allReducers), initionalState);

	const rootSaga = function*() {
		yield sagas;
	};

	sagaMiddleware.run(rootSaga);

	return store;
}




