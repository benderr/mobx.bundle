import React from 'react';
import ModulHeader from 'components/ModulHeader';
import {observable} from 'mobx'
import {observer} from 'mobx-react'

@observer
class SignInContainer extends React.Component {

    @observable count = 0;

    handleDec() {
        this.count++
    }

    render() {
        return (
            <div class="login">
                <ModulHeader/>
                <div className="login_section">
                    <div className="login_section_center">
                        <div className="login_content">
                            Counter: {this.count}
                            <button onClick={::this.handleDec} className="button">Test</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignInContainer;
