import React from 'react';
import ModulHeader from 'components/ModulHeader';
import SignInForm from '../components/SignInForm';
import { observer, inject } from 'mobx-react';

@inject('authStore')
@observer
class SignInContainer extends React.Component {
    handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
    handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
    handleSubmitForm = (e) => {
        const { authStore, history } = this.props;
        e.preventDefault();
        authStore.login();
            // .then(() => history.replace('/'));
    };

    render() {
        const { values: { email, password }, inProgress } = this.props.authStore;

        return (
          <div class='login'>
            <SignInForm
              inProgress={ inProgress }
              email={ email }
              password={ password }
              handleEmailChange={ this.handleEmailChange }
              handlePasswordChange={ this.handlePasswordChange }
              handleSubmitForm={ this.handleSubmitForm }
            />
          </div>
        );
    }
}

export default SignInContainer;
