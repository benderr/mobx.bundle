import {observable, action, isObservable} from 'mobx';
import {asyncAction} from 'mobx-utils';
import * as dataContext from '../dataProvider/accountDataContext';
import appStore from 'modules/core/stores/appStore'
import historyStore from 'modules/core/stores/historyStore';

class ProfileStore {
  @observable inProgress = false;
  @observable error = undefined;

  // @observable
  // profile = {
  //   avatarId: '',
  //   email: '',
  //   firstName: '',
  //   gender: '',
  //   lastName: '',
  //   middleName: '',
  //   notifications: [],
  //   groups: [],
  // };
  @observable
  profile = null;

  @action.bound
  getProfile = asyncAction(function*() {
    this.inProgress = true;
    try {
      const json = yield dataContext.getAccount();
      this.profile = json;
      return 'success';
    } catch (err) {
      this.error = err.toString();
      throw err;
    } finally {
      this.inProgress = false;
    }
  });

  @action.bound
  logout = asyncAction(function*() {
    this.inProgress = true;
    this.error = undefined;
    try {
      yield dataContext.logout();
    } catch (err) {
      throw err;
    } finally {
      appStore.removeToken();
      historyStore.fullReload('/signin');
      this.inProgress = false;
    }
  })

}
export default new ProfileStore();
