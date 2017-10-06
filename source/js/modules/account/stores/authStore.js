import { observable, action } from 'mobx';
import { logout, login, register } from '../dataProvider';

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


  @action
  login() {
    this.inProgress = true;
    this.authError = undefined;
    return login(this.user.email, this.user.password)
      .then((u) => {
        this.inProgress = false;
        this.user.name = u.name;
        this.token = u.token;
        this.user.password = '';
      }).catch((err) => {
        // this.authError = err.msg;
        console.log(err);
        throw err;
      })
      .finally(() => { this.inProgress = false; });
  }

  /*
    TODO: Пока это не работает, требуется настроить .babelrc
    Подробнее: https://github.com/mobxjs/babel-plugin-mobx-deep-action#-usage-for-async-and-generator-functions
    */
  // @action
  // login = async () => {
  // 	this.inProgress = true;
  // 	this.authError = undefined;
  // 	await login(this.user.email, this.user.password)
  // 	this.inProgress = false;
  // }

  @action
  register() {
    this.inProgress = true;
    this.authError = undefined;
    return register(this.user.email, this.user.password)
      .catch((err) => {
        this.authError = err.toString();
        throw err;
      })
      .finally(() => {
        this.inProgress = false;
        this.user.password = '';
      });
  }

  @action
  logout() {
    this.token = undefined;
    return logout();
  }
}

export default new AuthStore();
