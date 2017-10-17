import {observable, action} from 'mobx';
import {asyncAction} from 'mobx-utils';
import authStore from './authStore'
import localStorage from 'core/storage/localStorage'
const xToken = 'X-TOKEN';

class AppStore {
  @observable appReady = false;
  @observable profile;

  getToken() {
    return localStorage.getItem(xToken);
  }

  startApplication() {
    try {
      if (this.appReady)
        return;
      this.appReady = false;
      let setCheckingStop = true;
      if (this.profile == null) {
        const token = this.getToken();
        if (token) {
          const profile = yield call(dataContext.profile, token);

          const location = yield  select(accountSelectors.getCurrentLocation);
          if (location.get('pathname') == '/signin') {
            setCheckingStop = false;
            window.location.href = '/';
          } else {
            yield fork(retailPointsSaga.runRetailPoints);
          }
        }
      } else {
        yield fork(retailPointsSaga.runRetailPoints);
      }
      if (setCheckingStop)
        yield put(checkingAccessStop());

    } catch (err) {
      yield put(checkingAccessStop());
      yield put(login.failure(err));
      window.location.href = signInLocation.pathname;
      yield call(localStorage.removeItem, xToken);
    }
  }
}