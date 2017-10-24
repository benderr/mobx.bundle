import {createApi} from 'common/http/apiFactory';
import Http from 'common/http/Http';
import Interceptors from 'common/http/Interceptors';
import tokenInterceptorCreator from './interceptors/tokenInterceptor';
import localStorage from 'common/storage/localStorage';
import account from './resources/account';
import mocks from './mocks'
// import accountMock from './mocks/accountMock';
// import mock from 'core/api/mocks'
import axios from 'axios';

function initApi() {
  const interceptors = new Interceptors();
  const tokenInterceptor = tokenInterceptorCreator.create({
    getToken: () => localStorage.getItem('X-TOKEN'),
    setToken: (token) => localStorage.setItem('X-TOKEN', token),
  });
  interceptors.push(tokenInterceptor);
  const _http = new Http(axios, interceptors);
  const api = createApi(_http);
  account(api);
  // let mock1=accountMock(mock);
  // mock1.onAny().reply((params)=>{
  //
  //   return new Promise((resolve, reject) => {
  //     axios(params).then(resolve, reject);
  //   });
  // });

  if (__DEV__) {
    //const clearAxios = axios.create(axios.defaults);
    const mocker = mocks({account: true}, axios);
    mocker.onAny().passThrough()
  }

  return api;
}

const api = initApi();


export default api;
