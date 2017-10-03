import getRoutes from './routes'
import getStores from './stores'
import {createBrowserHistory} from 'history'
import logger from 'infrastructure/utils/logger'


export default function configure(modules) {

	const history = createBrowserHistory();
	const routes = getRoutes(modules);
	const stores = getStores(modules)

	return {stores, routes, history};
}