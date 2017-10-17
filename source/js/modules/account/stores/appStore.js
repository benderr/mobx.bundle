import {observable, action} from 'mobx';
import {asyncAction} from 'mobx-utils';
import authStore from 'authStore'

class AppStore {
  @observable appReady = false;

  startApplication() {
    try {
      if (this.appReady)
        return;
      this.appReady = false;
      let authData = yield select(accountSelectors.getAuthData);
      let setCheckingStop = true;
      if (authData == null) {
        const token = yield call(localStorage.getItem, xToken);
        if (token) {
          yield put(login.request());
          const profile = yield call(dataContext.profile, token);
          yield put(login.success({profile, token}));

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