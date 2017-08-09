import createStore from './store'
import getRoutes from './routes'
import getReducers from './reducer'
import getMiddlewares from './middlewares'
import {createBrowserHistory} from 'history'
import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects'
import {routerMiddleware} from 'connected-react-router/immutable'
import logger from 'infrastructure/utils/logger'

function getRootSaga(modules) {
	const sagas = modules.reduce((list, module) => {
		if (module.getSagas) {
			return list.concat(module.getSagas());
		}
		return list;
	}, []);

	return function*() {
		yield all(sagas);
	};
}

export default function configureRedux(modules, initState) {

	const history = createBrowserHistory();
	const sagaMiddleware = createSagaMiddleware({
		onError: (error) => {
			logger.error('TROLOLO', error);
		}
	});
	const routes = getRoutes(modules);
	const sagas = getRootSaga(modules);

	const store = createStore(
		{
			middleware: getMiddlewares(modules, routerMiddleware(history), sagaMiddleware),
			reducers: getReducers(modules),
			initionalState: initState,
			history
		}
	);

	function runSagas() {
		const task = sagaMiddleware.run(getRootSaga(modules));
		task.done.catch(error => {
			logger.error('OLOLO', error);
			runSagas();
		});
	}

	runSagas();


	return {store, routes, history};
}