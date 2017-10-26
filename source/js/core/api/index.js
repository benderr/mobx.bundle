import {createApi} from 'common/http/apiFactory';
import Http from 'common/http/Http';
import Interceptors from 'common/http/Interceptors';
import tokenInterceptorCreator from './interceptors/tokenInterceptor';
import accessForbiddenInterceptorCreator from './interceptors/accessForbiddenInterceptor';
import localStorage from 'common/storage/localStorage';
import account from './resources/account'
import agents from './resources/agents'
import company from './resources/company'
import mocks from './mocks'
import axios from 'axios';

function initApi() {
  const interceptors = new Interceptors();
  const tokenInterceptor = tokenInterceptorCreator.create({
    getToken: () => localStorage.getItem('X-TOKEN'),
    setToken: (token) => localStorage.setItem('X-TOKEN', token),
  });
  const accessForbiddenInterceptor = accessForbiddenInterceptorCreator.create();
  interceptors.push(tokenInterceptor);
  interceptors.push(accessForbiddenInterceptor);
  const _http = new Http(axios, interceptors);
  const api = createApi(_http);
  api.addResource('v2');

  agents(api);
  account(api);
  company(api);

  if (__DEV__) {
    //const clearAxios = axios.create(axios.defaults);
    const mocker = mocks({account: true, clients: true}, axios);
    mocker.onAny().passThrough()
  }

  return api;
}

const api = initApi();


export default api;
