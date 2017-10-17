import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Button, LoaderPanel } from 'modul-components';
import BaseForm from 'common/form/BaseForm';
import { InputField } from 'common/form/fields/index';
import { isRequired, isEmail } from 'common/form/validationHelpers/validation';

const fields = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    validators: [
      isRequired('Укажите электронную почту'),
      isEmail('Укажите корректную электронную почту'),
    ],
    initial: 'test001@test.ru',
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

@inject(({ authStore }) => ({
  inProgress: authStore.inProgress,
  error: authStore.error,
  login: authStore.login,
  errorReset: authStore.errorReset,
}))
@withRouter
@observer
class SignInContainer extends React.Component {

  static propTypes = {
    inProgress: PropTypes.bool.isRequired,
    error: PropTypes.object,
    login: PropTypes.func.isRequired,
    errorReset: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  @observable
  form = new BaseForm({ fields }, {
    hooks: {
      onSuccess: ::this.onSuccess,
      onError: ::this.onError,
    },
  })

  onSuccess(form) {
    const { email, password } = form.values();
    const { login, history } = this.props;
    login(email, password)
    .then(() => {
      history.replace('/profile');
    });
  }

  onError(form) {
    console.log(form);
    this.props.errorReset();
  }

  render() {
    const { inProgress, error } = this.props;
    let errorMsg;
    if (error) {
      if (error.data && error.data.message) {
        errorMsg = 'Неверный адрес электронной почты или пароль!';
      } else {
        errorMsg = 'Неизвестная ошибка';
      }
    }
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
                disabled={ inProgress }>Войти</Button>
            </div>
            <div class='form_errors'>
              {errorMsg}
            </div>
          </div>
        </form>
      </LoaderPanel>
    );
  }
}

export default SignInContainer;
