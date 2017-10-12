import { observable } from 'mobx';
import { asyncAction } from 'mobx-utils';
import * as dataContext from '../dataProvider/accountDataContext';

class ProfileStore {
  @observable inProgress = false;
  @observable error = undefined;

  @observable
  profile = new Map();

  getProfile = asyncAction(function* () {
    this.inProgress = true;
    try {
      const profile = yield dataContext.getAccount();
      this.profile.clear();
      this.profile.merge(profile.data);
      return 'success';
    } catch (err) {
      this.error = err.toString();
      throw err;
    } finally {
      this.inProgress = false;
    }
  })

  logout = asyncAction(function* () {
    this.inProgress = true;
    this.error = undefined;
    try {
      yield dataContext.logout();
      return 'success';
    } catch (err) {
      this.error = err.toString();
      throw err;
    } finally {
      this.inProgress = false;
    }
  })

}
export default new ProfileStore();
