import { isEmail, isRequired } from 'common/form/validationHelpers/validation';
import { observable, action, runInAction } from 'mobx';
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
];

export default class PasswordRecoveryController extends BaseForm {
  constructor({ store: { forgotPass } }) {
    const hooks = {
      onSuccess(form) {
        const { email } = form.values();
        forgotPass(email);
      }
    };
    super({ fields }, { hooks });
  }
}
