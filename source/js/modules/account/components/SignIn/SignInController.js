import {isEmail, isRequired} from 'common/form/validationHelpers/validation';
import {observable, action, runInAction} from 'mobx';
import BaseForm from 'common/form/BaseForm';

const fields = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
    initial: 'test002@test.ru',
  },
  {
    name: 'password',
    label: 'Пароль',
    placeholder: 'Пароль',
    validators: [
      isRequired('Введите пароль'),
    ],
    initial: 'Qq123456',
  },
];

export default class SignInController extends BaseForm {
  constructor({login, errorReset, redirectUrl}) {
    const hooks = {
      onSuccess(form) {
        const {email, password} = form.values();
        login(email, password, redirectUrl);
      },
      onError(form) {
        console.log('Ошибка');
        errorReset();
      },
    };
    super({fields}, {hooks});
  }

  @action.bound
  customMethod() {
    this.fields.get('email').set('0987654321');
  }
}
