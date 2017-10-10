import Form from 'mobx-react-form';
import validator from 'validator';
import { validateHelper } from 'modul-helpers';

const plugins = {
  vjf: validator,
};

function isEmail({ field }) {
  const isValid = validateHelper.validEmail(field.value);
  return [isValid, '123123'];
}

export default function ({ hooks = {} }) {
  const fields = [{
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    validators: [isEmail],
  }, {
    name: 'password',
    label: 'Пароль',
    placeholder: 'Пароль',
  }];
  return new Form({ fields }, { plugins, hooks });
}

