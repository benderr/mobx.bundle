import {createApi} from 'core/http/api'
import {compose as auth} from './auth'
import {compose as account} from './account'
import {Http} from 'core/http/Http'
import {Interceptors} from 'core/http/Interceptors'
import tokenInterceptorCreator from '../interceptors/tokenInterceptor';
import localStorage from 'core/storage/localStorage'

function initApi() {
	const _interceptors = new Interceptors();
	const tokenInterceptor = tokenInterceptorCreator
		.create({
			getToken: () => localStorage.getItem('X-TOKEN'),
			setToken: (token) => localStorage.setItem('X-TOKEN', token)
		});
	_interceptors.push(tokenInterceptor);
	const _http = new Http(_interceptors);
	const api = createApi(_http);
	auth(api);
	account(api);
	return api;
}

const api = initApi();

export default api;