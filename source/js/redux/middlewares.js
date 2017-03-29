import logger from 'dev/logger';
import thunk from 'redux-thunk';
import {applyMiddleware} from 'redux';
import {reduxReactRouter} from 'redux-router';
import {createHistory} from 'history';
import DevTools from 'dev/DevTools.jsx';

export default function getMiddlewares(modules) {
	let middlewares = [thunk];
	let composerFuncs = [reduxReactRouter({createHistory})];

	if (__DEV__) {
		middlewares.push(logger);
	}

	if (__DEV_TOOLS__)
		composerFuncs.push(DevTools.instrument());

	return [
		applyMiddleware(...middlewares),
		...composerFuncs
	];


}