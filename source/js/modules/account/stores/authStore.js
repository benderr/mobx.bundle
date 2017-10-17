import { observable, action } from 'mobx';
import { asyncAction } from 'mobx-utils';
import * as dataContext from '../dataProvider/accountDataContext';

class AuthStore {
  @observable inProgress = false;
  @observable error = undefined;

  @action.bound
  login = asyncAction(function* (email, password) {
    this.inProgress = true;
    this.error = undefined;
    try {
      yield dataContext.login({ email, password });
    } catch (error) {
      this.error = error;
      throw error;
    } finally {
      this.inProgress = false;
    }
  })

  @action.bound
  register = asyncAction(function* () {
    this.inProgress = true;
    this.error = undefined;
    try {
      yield register(this.user.email, this.user.password);
      this.inProgress = false;
      return 'success';
    } catch (err) {
      this.error = error;
      throw err;
    } finally {
      this.inProgress = false;
      this.reset();
    }
  })

  @action.bound
  errorReset() {
    this.error = undefined;
  }

  @action.bound
  forgotPass = asyncAction(function* (email) {
    this.inProgress = true;
    this.error = undefined;
    try {
      yield dataContext.forgotPass({ email });
      return 'success';
    } catch (err) {
      this.error = error;
      throw err;
    } finally {
      this.inProgress = false;
    }
  })
}

export default new AuthStore();
