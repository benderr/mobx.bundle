import {createApi} from 'common/http/api';
import Http from 'common/http/Http';
import Interceptors from 'common/http/Interceptors';
import tokenInterceptorCreator from './interceptors/tokenInterceptor';
import localStorage from 'common/storage/localStorage';
import account from './resources/account';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

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

  const mockAdapter = new MockAdapter(axios);
  mockAdapter
  .onGet('api/account')
    .reply(200, {
      'FirstName': '123',
      'LastName': 'Админ',
      'MiddleName': '',
      'Title': '',
      'Gender': 'Male',
      'Email': 'test002@test.ru',
      'AvatarId': null,
      'Notifications': [
        {
          'NotificationType': 'TaskAssignedToGroup',
          'IsActive': false,
          'Title': 'Оповещать о диалогах группы',
        },
        {
          'NotificationType': 'TaskAssignedOrResumedToAgent',
          'IsActive': false,
          'Title': 'Оповещать о моих диалогах',
        }],
    }, {'x-token': 'bc2bd2dc612e491da6e5ed62ca8f0222'})
  .onAny().passThrough();
    // .reply(function(params) {
    //   console.log(params);
    //   return new Promise(props => {
    //       axios(params)
    //     });
      // return new Promise((resolve, reject) => {
      //   axios(params).then(resolve, reject);
      // });
    // return Promise.resolve(axios(params))
  // });

  return api;
}

const api = initApi();

export default api;
