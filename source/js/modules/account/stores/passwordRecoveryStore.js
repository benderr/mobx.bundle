import { observable, action } from 'mobx';
import { asyncAction } from 'mobx-utils';
import historyStore from 'modules/core/stores/historyStore';
import profileStore from './profileStore';
import * as dataContext from '../dataProvider/accountDataContext';

class PasswordRecoveryStore {
  @observable inProgress = false;
  @observable status = 'init';
  @observable error = undefined;

  @action.bound
  forgotPass = asyncAction(function* (email) {
    this.error = undefined;
    this.status = 'init';
    this.inProgress = true;
    try {
      yield dataContext.forgotPass({ email });
      this.status = 'success';
      return 'success';
    } catch (error) {
      this.error = error;
      this.status = 'error';
      throw error;
    } finally {
      this.inProgress = false;
    }
  })
}

export default new PasswordRecoveryStore();
