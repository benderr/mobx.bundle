import { observable, action } from 'mobx';
import Form, { Field } from 'mobx-react-form';
import validator from 'validator';


class BaseForm extends Form {
  constructor(props){
    super(props)
  }

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

export default function ({ onSuccess: success, onError: error, fields }) {
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
  return new MyForm({ fields }, { plugins, hooks });
}

