import React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import SignInForm from '../components/SignInForm';

@inject('authStore')
@observer
class SignInContainer extends React.Component {
  handleEmailChange = e => {
    this.props.authStore.setEmail(e.target.value);
  };

  handlePasswordChange = e => {
    this.props.authStore.setPassword(e.target.value);
  };

  handleSubmitForm = (e) => {
    const { authStore, history } = this.props;
    e.preventDefault();
    authStore.register()
      .then((msg) => {
        history.replace('/signIn');
        alert(msg);
      });
  };

  render() {
    const { user, inProgress } = this.props.authStore;
    return (
      <div class='login'>
        <h1>
          Регистрация
        </h1>
        <SignInForm
          { ...this.props.authStore }
          handleEmailChange={ this.handleEmailChange }
          handlePasswordChange={ this.handlePasswordChange }
          handleSubmitForm={ this.handleSubmitForm }
          buttonName={ 'Зарегестрироваться' } />
      </div>
    );
  }
}

export default SignInContainer;
