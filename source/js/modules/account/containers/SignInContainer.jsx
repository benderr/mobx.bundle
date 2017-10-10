import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import SignInForm from '../components/SignInForm/SignInForm';
import AuthForm from '../components/SignInForm/AuthForm';
// import authForm from 'common/form/mobxValidationHelpers/AuthForm';

@inject('authStore', 'profileStore')
@withRouter
@observer
class SignInContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    const hooks = {
      onSuccess({ email, password }) {
        this.handleSubmitForm(email, password);
        alert('Form is valid! Send the request here.');
        // get field values
        console.log('Form Values!', form.values());
      },
      onError(form) {
        alert('Form has errors!');
        // get all form errors
        console.log('All form errors', form.errors());
      },
    };
    this.state = {
      form: AuthForm({
        hooks,
      }),
    };
  }

  static propTypes = {
    authStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  handleSubmitForm(email, password) {
    const { authStore, history } = this.props;
    authStore.login(email, password)
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
          form={ this.state.form }
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
