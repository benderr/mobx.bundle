import React from 'react';
import SignInForm from '../components/SignInForm'
import {connect} from 'react-redux';
import {login, resetLogin} from '../actions/loginActions'
import {bindActionCreators} from 'redux';
import {getSection} from '../selectors/accountSelectors'
import toJs from 'components/HOC/toJs';
import ModulHeader from 'components/ModulHeader';

class SignInContainer extends React.Component {
    componentDidMount() {
        this.props.resetLogin();
    }

    handleLogin(props) {
        this.props.login(props.get('email'), props.get('password'), this.props.redirectUrl);
    }

    render() {
        const {loading, redirectUrl, errors}=this.props;

        return (
            <div class="login">
                <ModulHeader/>
                <div className="login_section">
                    <div className="login_section_center">
                        <SignInForm onLogin={::this.handleLogin}
                                    errors={errors}
                                    redirectUrl={redirectUrl}
                                    loading={loading}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(toJs(SignInContainer));


function mapStateToProps(state, ownProps) {
    return {
        loading: getSection(state).get('loading'),
        errors: getSection(state).get('authError'),
        redirectUrl: '/' //todo ownProps.location.query && ownProps.location.query.redirectUrl || null
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login.request, dispatch),
        resetLogin: bindActionCreators(resetLogin, dispatch),
    }
}