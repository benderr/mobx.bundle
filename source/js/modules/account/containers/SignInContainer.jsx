import React from 'react';
import ModulHeader from 'components/ModulHeader';
import SignInForm from './../components/SignInForm2';
import {observable} from 'mobx'
import {observer, inject} from 'mobx-react'

@inject('account.authStore')
@observer
class SignInContainer extends React.Component {
    //
    // @observable count = 0;
    // handleEmailChange = e => this.props.account.authStore.setEmail(e.target.value);
    // handlePasswordChange = e => this.props.account.authStore.setPassword(e.target.value);
    // handleSubmitForm = (e) => {
    //     e.preventDefault();
    //     this.props.account.authStore.login()
    //         // .then(() => this.props.history.replace('/'));
    // };

    render() {
        console.log(this.props)
        const {values: {email, password}, inProgress} = this.props.account.authStore

        return (
            <div class="login">
                {/*<ModulHeader/>*/}
                {/*<SignInForm*/}
                    {/*inProgress={inProgress}*/}
                    {/*email={email}*/}
                    {/*password={password}*/}
                    {/*handleEmailChange={this.handleEmailChange}*/}
                    {/*handlePasswordChange={this.handlePasswordChange}*/}
                    {/*handleSubmitForm={this.handleSubmitForm}*/}
                {/*/>*/}
            </div>
        );
    }
}

export default SignInContainer;
