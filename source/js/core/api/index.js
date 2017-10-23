import {createApi} from 'common/http/api';
import Http from 'common/http/Http';
import Interceptors from 'common/http/Interceptors';
import tokenInterceptorCreator from './interceptors/tokenInterceptor';
import accessForbiddenInterceptorCreator from './interceptors/accessForbiddenInterceptor';
import localStorage from 'common/storage/localStorage';
import account from './resources/account'
import agents from './resources/agents'

function initApi() {
  const _interceptors = new Interceptors();
  const tokenInterceptor = tokenInterceptorCreator.create({
    getToken: () => localStorage.getItem('X-TOKEN'),
    setToken: (token) => localStorage.setItem('X-TOKEN', token),
  });
  const accessForbiddenInterceptor = accessForbiddenInterceptorCreator.create();
  _interceptors.push(tokenInterceptor);
  _interceptors.push(accessForbiddenInterceptor);
  const _http = new Http(_interceptors);
  const api = createApi(_http);
  api.addResource('v2');

  agents(api);
  account(api);

  return api;
}

const api = initApi();

export default api;
