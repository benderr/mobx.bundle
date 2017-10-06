import { observable, action } from 'mobx';
import { logout, login, register } from '../dataProvider';
import { asyncAction } from 'mobx-utils';

class AuthStore {
  @observable inProgress = false;
  @observable authError = undefined;
  @observable token = undefined;

  @observable
  user = {
    email: 'example@exmpl.ru',
    password: '123123',
    name: '',
  };

  @action
  setEmail(email) {
    this.user.email = email;
  }

  @action
  setPassword(password) {
    this.user.password = password;
  }

  login = asyncAction(function* () {
    this.inProgress = true;
    this.authError = undefined;
    try {
      const user = yield login(this.user.email, this.user.password);
      this.token = user.token;
      this.user.name = user.name;
      this.inProgress = false;
    } catch (error) {
      throw error;
    }
  })

  register = asyncAction(function* () {
    this.inProgress = true;
    this.authError = undefined;
    try {
      yield register(this.user.email, this.user.password);
      this.inProgress = false;
    } catch (err) {
      this.authError = err.toString();
      throw err;
    } finally {
      this.inProgress = false;
      this.user.password = '';
    }
  })

  logout = asyncAction(function* () {
    yield logout();
    this.token = undefined;
  })
}

export default new AuthStore();
