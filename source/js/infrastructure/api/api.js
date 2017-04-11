import {createApi} from 'core/http/api'
import {compose as auth} from './auth'
import {Http} from 'core/http/Http'
import {Interceptors} from 'core/http/Interceptors'

function initApi() {
	const _interceptors = new Interceptors();
	//_interceptors.push()
	const _http = new Http(_interceptors);
	const api = createApi(_http);
	auth(api);
	return api;
}

const api = initApi();

export default api;