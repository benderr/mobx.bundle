import bus, {events} from 'core/bus'

export default {
  create() {
    return {responseError};

    function responseError(resp) {
      if (resp && resp.status == 403) {
        bus.publish(events.ACCESS_FORBIDDEN, resp);
      }
      return Promise.reject(resp);
    }
  },
};
