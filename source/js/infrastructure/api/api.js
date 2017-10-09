import { createApi } from 'core/http/api';
import { Http } from 'core/http/Http';
import { Interceptors } from 'core/http/Interceptors';
import tokenInterceptorCreator from '../interceptors/tokenInterceptor';
import localStorage from 'core/storage/localStorage';
import account from './account'

function initApi() {
  const _interceptors = new Interceptors();
  const tokenInterceptor = tokenInterceptorCreator.create({
    getToken: () => localStorage.getItem('X-TOKEN'),
    setToken: (token) => localStorage.setItem('X-TOKEN', token),
  });
  _interceptors.push(tokenInterceptor);
  const _http = new Http(_interceptors);
  const api = createApi(_http);
  account(api);
  return api;
}

const api = initApi();

export default api;
