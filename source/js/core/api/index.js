import {createApi} from 'common/http/api';
import Http from 'common/http/Http';
import Interceptors from 'common/http/Interceptors';
import tokenInterceptorCreator from './interceptors/tokenInterceptor';
import localStorage from 'common/storage/localStorage';
import account from './resources/account'

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
