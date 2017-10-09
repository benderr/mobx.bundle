import { observable, action } from 'mobx';
import { asyncAction } from 'mobx-utils';
import * as dataContext from '../dataProvider/accountDataContext';

class AuthStore {
  @observable inProgress = false;
  @observable error = undefined;
  @observable token = undefined;

  @observable
  user = {
    email: '',
    password: '',
  };

  @action
  setEmail(email) {
    this.user.email = email;
  }

  @action
  setPassword(password) {
    this.user.password = password;
  }

  @action
  reset() {
    this.email = '';
    this.password = '';
  }

  login = asyncAction(function* () {
    this.inProgress = true;
    this.error = undefined;
    try {
      const user = yield dataContext.login({ email: this.user.email, password: this.user.password });
      this.user.name = user.name;
      this.inProgress = false;
    } catch (error) {
      throw error;
    } finally {
      this.inProgress = false;
      this.reset();
    }
  })

  register = asyncAction(function* () {
    this.inProgress = true;
    this.error = undefined;
    try {
      yield register(this.user.email, this.user.password);
      this.inProgress = false;
      return 'success';
    } catch (err) {
      this.error = err.toString();
      throw err;
    } finally {
      this.inProgress = false;
      this.reset();
    }
  })

  forgotPass = asyncAction(function* () {
    this.inProgress = true;
    this.error = undefined;
    try {
      yield dataContext.forgotPass({ email: this.user.email });
      return 'success';
    } catch (err) {
      this.error = err.toString();
      throw err;
    } finally {
      this.inProgress = false;
      this.reset();
    }
  })
}

export default new AuthStore();
