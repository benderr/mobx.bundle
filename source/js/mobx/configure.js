import getRoutes from './routes'
import {createBrowserHistory} from 'history'
import logger from 'infrastructure/utils/logger'


export default function configure(modules) {

	const history = createBrowserHistory();
	const routes = getRoutes(modules);

	return {store: {}, routes, history};
}