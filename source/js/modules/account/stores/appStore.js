import {observable, action} from 'mobx';
import {asyncAction} from 'mobx-utils';
import profileStore from './profileStore'
import routeStore from 'core/routeStore'
import localStorage from 'core/storage/localStorage'

const xToken = 'X-TOKEN';

class AppStore {
  @observable appReady = false;

  getToken() {
    return localStorage.getItem(xToken);
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

          const location = routeStore.history.location;
          if (location.pathname == '/signin') {
            setCheckingStop = false;
            window.location.href = '/';
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
      window.location.href = '/signin';
      localStorage.removeItem(xToken);
    }
  })
}

export default new AppStore();