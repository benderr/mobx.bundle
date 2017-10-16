import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button, LoaderPanel } from 'modul-components';
import { validateHelper } from 'modul-helpers';
import BaseForm from 'common/form/BaseForm';
import { InputField } from 'common/form/fields';

const fields = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    validators: [isEmail, isRequired],
    initial: 'test001@test.ru',
  },
  {
    name: 'password',
    label: 'Пароль',
    placeholder: 'Пароль',
    validators: [isRequired],
    initial: 'Qq123456',
  },
];

function isEmail({ field }) {
  const isValid = validateHelper.validEmail(field.value);
  return [isValid, 'Email not valid!'];
}

function isRequired({ field }) {
  const isValid = !validateHelper.isEmpty(field.value);
  return [isValid, 'Is required'];
}

@observer
class SignInForm extends React.Component {

  @observable
  form = new BaseForm({ fields }, {
    hooks: {
      onSuccess: this.props.onSuccess,
      onError: this.props.onError,
    },
  })

  render() {
    const { inProgress, buttonName } = this.props;
    return (
      <LoaderPanel >
        <form onSubmit={ this.form.onSubmit }>
          <div class='login_auth_block '>
            <div class='form_group'>
              <div class='input_group light w100'>
                <InputField field={ this.form.$('email') } hideTips={ true } />
                <div class='input_group_addon icon-mail' />
                <div class='input_light_border_bottom' />
              </div>
            </div>

            <div class='form_group'>
              <div class='input_group light w100'>
                <InputField field={ this.form.$('password') } type='password' hideTips={ true } />
                <div class='input_group_addon icon-password' />
                <div class='input_light_border_bottom' />
              </div>
            </div>

            <div class='form_buttons'>
              <Button
                loading={ inProgress } className='button'
                type='submit'
                disabled={ inProgress }>{ buttonName }</Button>
            </div>
          </div>
        </form>
      </LoaderPanel>
    );
  }
}


export default SignInForm;
