import {validateHelper} from 'modul-helpers';
import {observable, action} from 'mobx';
import Form, {Field} from 'mobx-react-form';
import validator from 'validator';

class RefField extends Field {
  constructor(props) {
    super(props);
    this.ref = null;
    this.getForm = function () {
      return props.form;
    };
    this.submitFailed = function () {
      return props.form.submitFailed;
    };
  }
}
class MyForm extends Form {

  @observable submitFailed = false;

  @action afterFailedSubmit() {
    this.submitFailed = true;
  }

  @action afterSuccessSubmit() {
    this.submitFailed = false;
  }

  @observable submitFailed = false;
  makeField(props) {
    return new RefField({ ...props, form: this });
  }
}

const plugins = {
  vjf: validator,
};

function isEmail({field}) {
  const isValid = validateHelper.validEmail(field.value);
  return [isValid, 'Email not valid!'];
}

function isRequired({field}) {
  const isValid = !validateHelper.isEmpty(field.value);
  return [isValid, 'Is required'];
}

const fields = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    validators: [isEmail],
    initial: 'test001@test.ru',
  },
  {
    name: 'password',
    label: 'Пароль',
    placeholder: 'Пароль',
    initial: 'Qq123456',
  },
  // {
  //   name: 'phone',
  //   label: 'phone',
  //   placeholder: 'phone',
  //   validators: [isEmail, isRequired],
  // },
];

export default function ({onSuccess: success, onError: error}) {
  const hooks = {
    onSuccess(form) {
      form.afterSuccessSubmit();
      success(form);
    },
    onError(form) {
      form.afterFailedSubmit();
      const errors = form.errors();
      const keys = form.fields.keys();
      const firstErrorName = keys.find(name => !!errors[name]);
      const ref = form.fields.get(firstErrorName).ref;
      if (typeof ref.setFocus === 'function') {
        ref.setFocus();
      }
      error(form);
    },
  };
  return new MyForm({fields}, {plugins, hooks});
}

