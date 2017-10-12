// import q from 'q';

const AuthorizationKey = 'Authorization';
// const xRegistrationTokenKey = 'X-RegistrationToken';

export default {
  create({ getToken, setToken }) {
    return { request, response, responseError };

    function request(config) {
      // if (config.Authorization) {
      //   config.headers[AuthorizationKey] = config.Authorization;
      // }

			// это нужно чтобы при получении 401, в барузере не появлялся стандартный попап для авторизации
      // config.headers['X-Requested-With'] = 'XMLHttpRequest';

      const token = getToken();
      if (token) {
        config.headers['x-token'] = token;
      }
      return config;
    }

    function response(resp) {
      console.log(resp);
      const token = resp.headers['x-token'];
      // || resp.headers[xRegistrationTokenKey];
      if (token) {
        setToken(token);
      }
      return resp;
    }

    function responseError(resp) {
      if (resp.status == 401) {
        setToken(null);
      }
      return Promise.reject(resp);
    }
  },
};
