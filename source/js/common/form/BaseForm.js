import { observable, action } from 'mobx';
import Form from 'mobx-react-form';
import validator from 'validator';
import BaseField from './BaseField';

export default class BaseForm extends Form {
  constructor(...props) {
    let customOnSuccess = function () {};
    let customOnError = function () {};
    const hooks = props[1] && props[1].hooks;
    if (hooks) {
      if (hooks.onSuccess instanceof Function) {
        customOnSuccess = hooks.onSuccess;
        props[1].hooks.onSuccess = undefined;
      }

      if (hooks.onError instanceof Function) {
        customOnError = hooks.onError;
        props[1].hooks.onError = undefined;
      }
    }
    super(...props);
    // До super(...props) вызывать this нельзя
    this.customOnSuccess = customOnSuccess;
    this.customOnError = customOnError;
  }

  @observable submitFailed = false;

  @action
  afterFailedSubmit() {
    this.submitFailed = true;
  }

  @action
  afterSuccessSubmit() {
    this.submitFailed = false;
  }

  makeField(props) {
    return new BaseField({ ...props });
  }

  hooks() {
    return {
      onSuccess(form) {
        form.afterSuccessSubmit();
        this.customOnSuccess(form);
      },
      onError(form) {
        form.afterFailedSubmit();
        const errors = form.errors();
        const keys = form.fields.keys();
        const firstErrorName = keys.find(name => typeof errors[name] === 'string');
        const ref = form.fields.get(firstErrorName).ref;
        if (ref.setFocus instanceof Function) {
          ref.setFocus();
        }
        this.customOnError(form);
      },
    };
  }
}
