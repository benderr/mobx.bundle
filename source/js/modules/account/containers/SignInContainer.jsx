import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import BaseForm from 'common/form/BaseForm';
import SignInForm from '../components/SignInForm';


import { validateHelper } from 'modul-helpers';

function isEmail({ field }) {
  const isValid = validateHelper.validEmail(field.value);
  return [isValid, 'Email not valid!'];
}

function isRequired({ field }) {
  const isValid = !validateHelper.isEmpty(field.value);
  return [isValid, 'Is required'];
}

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

@inject(({ authStore }) => ({
  inProgress: authStore.inProgress,
  error: authStore.error,
  login: authStore.login,
}))
@withRouter
@observer
class SignInContainer extends React.Component {

  static propTypes = {
    inProgress: PropTypes.bool.isRequired,
    error: PropTypes.object,
    login: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  onSuccess(form) {
    const { email, password } = form.values();
    const { login, history } = this.props;
    login(email, password)
      .then(() => {
        history.replace('/profile');
      });
  }

  @observable form = new BaseForm({ fields }, {
    hooks: {
      onSuccess: ::this.onSuccess,
      onError(form) {
        console.log('ERRORS');
      },
    },
  });

  render() {
    return (
      <div class='login'>
        <header class='login_header'>
          <a href='#'><strong>Модуль</strong>Касса</a>
        </header>
        <div class='login_section'>
          <div class='login_section_center'>
            <div class='login_content'>
              <SignInForm
                inProgress={ this.props.inProgress }
                form={ this.form }
                buttonName={ 'Войти' } />
            </div>
            <div className='login_links'>
              <Link to='/forgot'>Забыли пароль?</Link>
              <Link to='/registration'>Зарегистрироваться</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInContainer;
