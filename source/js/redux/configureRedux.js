import createStore from './store'
import getRoutes from './routes' //TODO
import getReducers from './reducer'
import {getMiddlewares, sagaMiddleware, getSagas} from './middlewares'
import {createBrowserHistory} from 'history'

import moment from 'moment'


export default function configureRedux(modules, initState) {
	moment.locale('ru');

	const history = createBrowserHistory();
	const store = createStore(
		{
			middleware: getMiddlewares(modules, history),
			reducers: getReducers(modules),
			initionalState: initState,
			sagaMiddleware,
			sagas: getSagas(modules),
			history
		}
	);
	const routes = getRoutes(modules, store);
	return {store, routes, history};
}