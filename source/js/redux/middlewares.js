import logger from 'dev/logger';
import thunk from 'redux-thunk';
import {applyMiddleware, compose} from 'redux';
import DevTools from 'dev/DevTools.jsx';

export default function getMiddlewares(modules) {
	let middleware = [thunk];
	if (__DEV__) {
		middleware.push(logger);
		if (__DEV_TOOLS__) {
			middleware = compose(
				middleware,
				DevTools.instrument()
			);
		}
	}
	return applyMiddleware(...middleware);
}