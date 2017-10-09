import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import SignInForm from '../components/SignInForm';

@inject('authStore', 'profileStore')
@withRouter
@observer
class SignInContainer extends React.Component {

  static propTypes = {
    authStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  handleEmailChange(e) {
    this.props.authStore.setEmail(e.target.value);
  }

  handlePasswordChange(e) {
    this.props.authStore.setPassword(e.target.value);
  }

  handleSubmitForm(e) {
    const { authStore, history } = this.props;
    e.preventDefault();
    authStore.login()
      .then(() => { history.replace('/profile'); });
  }

  render() {
    return (
      <div class='login'>
        <h1>
          Вход
        </h1>
        <SignInForm
          authStore={ this.props.authStore }
          handleEmailChange={ ::this.handleEmailChange }
          handlePasswordChange={ ::this.handlePasswordChange }
          handleSubmitForm={ ::this.handleSubmitForm }
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
