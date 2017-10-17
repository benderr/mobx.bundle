import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import SignInForm from '../forms/SignInForm';

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

  onError(form) {
    console.log(form);
  }

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
                onSuccess={ ::this.onSuccess }
                onError={ ::this.onError }
                buttonName={ 'Войти' } />
              <SignInForm
                inProgress={ this.props.inProgress }
                onSuccess={ ::this.onSuccess }
                onError={ ::this.onError }
                buttonName={ 'Войти ещё раз' } />
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