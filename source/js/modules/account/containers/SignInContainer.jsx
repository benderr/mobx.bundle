import React from 'react';
//import SignInForm from '../components/SignInForm'
import ModulHeader from 'components/ModulHeader';
import {observable} from 'mobx'
import {observer} from 'mobx-react'

@observer
class SignInContainer extends React.Component {

    @observable count = 0;

    handleDec=()=> {
        alert();
        if (!this.count)
            this.count = 0;
        this.count += 1;
    }

    render() {
        return (
            <div class="login">
                <ModulHeader/>
                <div className="login_section">
                    <div className="login_section_center">
                        {/*Counter: {this.count}*/}
                        {/*<button onClick={this.handleDec} className="button">Test</button>*/}
                        {/*<SignInForm onLogin={::this.handleLogin}*/}
                        {/*errors={errors}*/}
                        {/*redirectUrl={redirectUrl}*/}
                        {/*loading={loading}/>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default SignInContainer;
