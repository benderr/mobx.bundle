import createStore from './store'
import getRoutes, {makeRouteHooksSafe} from './routes' //TODO
import getReducers from './reducer'
import getMiddlewares from './middlewares'

export default function configureRedux(modules, initState) {
	const store = createStore(getMiddlewares(modules), getReducers(modules), makeRouteHooksSafe(modules), initState);
	const routes = getRoutes(modules, store);
	return {store, routes};
}
