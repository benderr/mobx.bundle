import {observable, action} from 'mobx';
import {asyncAction} from 'mobx-utils';
import profileStore from 'modules/account/stores/profileStore'
import historyStore from './historyStore'
import localStorage from 'core/storage/localStorage'

const xToken = 'X-TOKEN';

class AppStore {
  @observable appReady = false;

  getToken() {
    return localStorage.getItem(xToken);
  }

  removeToken() {
    localStorage.removeItem(xToken)
  }

  applicationStarted() {
    //запускаем забор каких то данных
  }

  startApplication = asyncAction(function*() {
    try {
      if (this.appReady)
        return;
      this.appReady = false;
      let setCheckingStop = true;
      if (profileStore.profile == null) {
        const token = this.getToken();
        if (token) {
          yield profileStore.getProfile();

          const location = historyStore.history.location;
          if (location.pathname == '/signin') {
            setCheckingStop = false;
            historyStore.fullReload('/');
          } else {
            this.applicationStarted();
          }
        }
      } else {
        this.applicationStarted();
      }
      if (setCheckingStop)
        this.appReady = true;

    } catch (err) {
      this.appReady = true;
      historyStore.fullReload('/signin');
      localStorage.removeItem(xToken);
    }
  })
}

export default new AppStore();