import {createApi} from 'core/http/api'
import {compose as base} from './base'
import {compose as user} from './user'
import retail from './retail'
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
	base(api);
	user(api);
	retail(api)
	return api;
}

const api = initApi();

export default api;