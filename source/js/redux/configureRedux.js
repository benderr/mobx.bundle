import createStore from './store'
import getRoutes, {makeRouteHooksSafe} from './routes' //TODO
import getReducers from './reducer'
import {getMiddlewares, sagaMiddleware, getSagas} from './middlewares'

export default function configureRedux(modules, initState) {
	const store = createStore(
		{
			middleware: getMiddlewares(modules),
			reducers: getReducers(modules),
			routes: makeRouteHooksSafe(modules),
			initionalState: initState,
			sagaMiddleware,
			sagas: getSagas(modules)
		}
	);
	const routes = getRoutes(modules, store);
	return {store, routes};
}