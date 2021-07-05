import {observable, action} from 'mobx';
import {asyncAction} from 'mobx-utils';
import historyStore from './historyStore'
import localStorage from 'common/storage/localStorage'
import bus, {events} from 'core/bus'
import * as dataContext from '../dataProvider/dataContext'
import qs from 'qs';

const xToken = 'X-TOKEN';

class AppStore {
  @observable appReady = false;

  startApplication = asyncAction(function*({routes}) {
    const location = historyStore.history.location;
    const isAnonymousLocation = historyStore.isAnonymousLocation(location, routes);

    this.appReady = false;
    const validToken = yield this.checkToken();

    if (validToken) {
      if (location.pathname == '/signin') {
        historyStore.fullReload('/');
      } else {
        this.appReady = true;
        this.applicationStarted(validToken);
      }
    } else {
      if (!isAnonymousLocation) {
        const url = qs.stringify({redirectUrl: location.pathname});
        historyStore.fullReload(`/signin?${url}`);
      } else {
        this.appReady = true;
        this.applicationStarted(validToken);
      }
    }
  });

  checkToken = asyncAction(function*() {
    const token = localStorage.getItem(xToken); //todo подумать, переписать
    if (token) {
      try {
        yield dataContext.checkToken();
        return true;
      }
      catch (err) {
        logger.log(err);
        return false;
      }
    }
    return false;
  });

  applicationStarted(validToken) {
    bus.publish(events.APP_READY, validToken);

    bus.subscribe(events.ACCESS_DENIED, () => {
      historyStore.fullReload('/signin');
    });
    bus.subscribe(events.LOGOUT, () => {
      localStorage.removeItem(xToken);
      historyStore.fullReload('/signin');
    });

  }
}

export default new AppStore();