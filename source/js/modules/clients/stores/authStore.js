import {observable, action} from 'mobx';
import {asyncAction} from 'mobx-utils';
import historyStore from 'modules/core/stores/historyStore';
import profileStore from './profileStore';
import * as dataContext from '../dataProvider/accountDataContext';

class AuthStore {
  @observable inProgress = false;
  @observable error = undefined;
  @observable passwordRecoveryStatus = 'initial'

  @action.bound
  login = asyncAction(function*(email, password, redirectUrl) {
    this.inProgress = true;
    this.error = undefined;
    try {
      yield dataContext.login({email, password, redirectUrl});
      //yield profileStore.getProfile();
      historyStore.fullReload(redirectUrl || '/');
    } catch (error) {
      this.error = error;
      throw error;
    } finally {
      this.inProgress = false;
    }
  });

  @action.bound
  register = asyncAction(function*() {
    this.inProgress = true;
    this.error = undefined;
    try {
      yield register(this.user.email, this.user.password);
      this.inProgress = false;
      return 'success';
    } catch (error) {
      this.error = error;
      throw err;
    } finally {
      this.inProgress = false;
    }
  })

  @action.bound
  errorReset() {
    this.error = undefined;
  }

  @action.bound
  forgotPass = asyncAction(function*(email) {
    this.passwordRecoveryStatus = 'initial';
    this.inProgress = true;
    this.error = undefined;
    try {
      yield dataContext.forgotPass({email});
      this.passwordRecoveryStatus = 'success';
      return 'success';
    } catch (error) {
      this.error = error;
      throw error;
    } finally {
      this.inProgress = false;
    }
  })
}

export default new AuthStore();
