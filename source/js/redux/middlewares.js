import logger from 'dev/logger';
import thunk from 'redux-thunk';
import {applyMiddleware, compose} from 'redux';

export default function getMiddlewares(modules) {
	let middleware = [thunk];
	if (__DEV__) {
		middleware.push(logger);
	}

	return applyMiddleware(...middleware);
}