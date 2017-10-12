import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import SignInForm from '../../components/SignInForm';
import signInMobxForm from './signInMobxForm';

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
      .then(() => { history.replace('/profile'); });
  }

  @observable form = signInMobxForm({
    onSuccess: ::this.onSuccess,
    onError(form) {
      // form.fields.get('email').focus();
      // console.log(form.fields.get('phone').options.setFocus())
      // f.focus();
      // React.findDOMNode(component).focus();
    }
  })

  render() {
    return (
      <div class='login'>
        <h1>
          Вход
        </h1>
        <SignInForm
          inProgress={ this.props.inProgress }
          form={ this.form }
          buttonName={ 'Войти' } />
        <div className='login_links'>
          <ui>
            <li><Link to='/forgot'>Забыли пароль?</Link></li>
            <li><Link to='/registration'>Зарегистрироваться</Link></li>
          </ui>
        </div>
      </div>
    );
  }
}

export default SignInContainer;
