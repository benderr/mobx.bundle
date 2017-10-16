import {observable, action} from 'mobx'
import Form from 'mobx-react-form'
import BaseField from './BaseField'

export default class BaseForm extends Form {
  constructor(arg1, {hooks, ...args2}) {
    let customOnSuccess = function () {
    }
    let customOnError = function () {
    }
    //const hooks = props[1] && props[1].hooks
    if (hooks) {
      if (hooks.onSuccess instanceof Function) {
        customOnSuccess = hooks.onSuccess;
        hooks.onSuccess = undefined
      }

      if (hooks.onError instanceof Function) {
        customOnError = hooks.onError;
        hooks.onError = undefined
      }
    }
    //const props =
    super(arg1, {hooks, ...args2});
    // До super(...props) вызывать this нельзя
    this.customOnSuccess = customOnSuccess;
    this.customOnError = customOnError
  }

  @observable submitFailed = false;

  @action
  afterFailedSubmit() {
    this.submitFailed = true
  }

  @action
  afterSuccessSubmit() {
    this.submitFailed = false
  }

  makeField(props) {
    return new BaseField({...props})
  }

  hooks() {
    return {
      onSuccess (form) {
        form.afterSuccessSubmit();
        this.customOnSuccess(form)
      },
      onError (form) {
        form.afterFailedSubmit();
        const errors = form.errors();
        const keys = form.fields.keys();
        const firstErrorName = keys.find(
          name => typeof errors[name] === 'string');
        const ref = form.fields.get(firstErrorName).ref
        if (ref.setFocus instanceof Function) {
          ref.setFocus()
        }
        this.customOnError(form)
      },
    }
  }

  bindings() {
    return {
      // we can choose a name as key
      SelectField: {
        id: 'id',
        name: 'name',
        value: 'value',
        label: 'floatingLabelText',
        placeholder: 'hintText',
        disabled: 'disabled',
        error: 'errorText',
        onChange: 'onChange',
        onBlur: 'onBlur',
        onFocus: 'onFocus',
        onInputChange: 'autoFocus',
        options: 'options',
        creatable: 'creatable',
        searchable: 'searchable'
      },
    };
  }
}
