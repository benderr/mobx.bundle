import React from 'react';
//import SignInForm from '../components/SignInForm'
import ModulHeader from 'components/ModulHeader';

class SignInContainer extends React.Component {


    render() {
        const {loading, redirectUrl, errors}=this.props;

        return (
            <div class="login">
                <ModulHeader/>
                <div className="login_section">
                    <div className="login_section_center">
                        {/*<SignInForm onLogin={::this.handleLogin}*/}
                                    {/*errors={errors}*/}
                                    {/*redirectUrl={redirectUrl}*/}
                                    {/*loading={loading}/>*/}
                                    Вход
                    </div>
                </div>
            </div>
        );
    }
}

export default SignInContainer;
