import {observable, action, isObservable} from 'mobx';
import {asyncAction} from 'mobx-utils';
import * as dataContext from '../dataProvider/accountDataContext';
import bus, {events} from 'core/bus'

class ProfileStore {
  @observable inProgress = false;
  @observable error = undefined;
  @observable profileReady = false;

  constructor() {
    bus.subscribe(events.APP_READY, authorized => this.onAppReady(authorized));
  }

  @action.bound
  onAppReady = asyncAction(function*(authorized) {
    try {
      this.profileReady = false;
      if (authorized)
        yield this.getProfile();
    } catch (err) {
    } finally {
      this.profileReady = true;
    }
  });


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
      bus.publish(events.LOGOUT);
      this.inProgress = false;
    }
  })

}
export default new ProfileStore();
