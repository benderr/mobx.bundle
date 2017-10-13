import {observable, action} from 'mobx';
import Form from 'mobx-react-form';
import validator from 'validator';
import BaseField from './fields/BaseField'

export default class BaseForm extends Form {
  constructor(...props) {
    super(...props)
  }

  @observable submitFailed = false;

  @action afterFailedSubmit() {
    this.submitFailed = true;
  }

  @action afterSuccessSubmit() {
    this.submitFailed = false;
  }

  makeField(props) {
    return new BaseField({...props, form: this});
  }

  hooks() {
    //const onSuccess = (form) => .onSuccess(form);
    //const {onSuccess, onError}=this.$hooks;
    //const onSuccess = (form) => this.$hooks.success(form);
    //const onError = (form) => this.$hooks.error(form);
    const hooks = {};
    hooks.onSuccess = (form) => {
      form.afterSuccessSubmit();
      this.$hooks.onSuccess(form);
    };

    hooks.onError = (form) => {
      form.afterFailedSubmit();
      const errors = form.errors();
      const keys = form.fields.keys();
      const firstErrorName = keys.find(name => !!errors[name]);
      const ref = form.fields.get(firstErrorName).ref;
      if (typeof ref.setFocus === 'function') {
        ref.setFocus();
      }
      this.$hooks.onError(form);
    };
    return hooks;
  }
}

// export default function ({onSuccess: success, onError: error, fields}) {
//   const hooks = {
//     onSuccess(form) {
//       form.afterSuccessSubmit();
//       success(form);
//     },
//     onError(form) {
//       form.afterFailedSubmit();
//       const errors = form.errors();
//       const keys = form.fields.keys();
//       const firstErrorName = keys.find(name => !!errors[name]);
//       const ref = form.fields.get(firstErrorName).ref;
//       if (typeof ref.setFocus === 'function') {
//         ref.setFocus();
//       }
//       error(form);
//     },
//   };
//   return new MyForm({fields}, {plugins, hooks});
// }

