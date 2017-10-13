import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import SignInForm from '../components/RegistrationForm';

@inject('authStore')
@withRouter
@observer
class RegistrationContainer extends React.Component {

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
    authStore.register()
      .then((msg) => {
        history.replace('/signIn');
        alert(msg);
      });
  }

  render() {
    return (
      <div class='login'>
        <h1>
          Регистрация
        </h1>
        <SignInForm
          authStore={ this.props.authStore }
          handleEmailChange={ ::this.handleEmailChange }
          handlePasswordChange={ ::this.handlePasswordChange }
          handleSubmitForm={ ::this.handleSubmitForm }
          buttonName={ 'Зарегестрироваться' } />
      </div>
    );
  }
}

export default RegistrationContainer