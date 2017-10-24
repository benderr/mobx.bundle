// import q from 'q';
import bus, {events} from 'core/bus'
const xTokenKey = 'x-token';
//import localStorage from 'common/storage/localStorage'
//let xToken;

export default {
  create({getToken, setToken}) {
    // bus.subscribe(events.SET_TOKEN, ({token}) => {
    //   xToken = token;
    // });

    return {request, response, responseError};

    function request(config) {
      const token = getToken();
      if (token) {
        config.headers[xTokenKey] = token;
      }
      return config;
    }

    function response(resp) {
      const token = resp.headers[xTokenKey];
      if (token) {
        setToken(token);
        //xToken = token;
        //bus.publish(events.SET_TOKEN, {token});
      }
      return resp;
    }

    function responseError(resp) {
      if (resp && resp.status == 401) {
        setToken(null);
        bus.publish(events.ACCESS_DENIED, resp);
      }
      return Promise.reject(resp);
    }
  },
};
