import React from 'react';
import SignInForm from '../components/SignInForm'
import {connect} from 'react-redux';
import {login} from '../actions/loginActions'
import {bindActionCreators} from 'redux';
import {getSection} from '../selectors/accountSelectors'
import toJs from 'components/HOC/toJs';
import ModulHeader from 'components/ModulHeader';
// import styles from 'components/ExternalLayoutStyles';

const SignInContainer = props => {
    const {loading, login, redirectUrl, errors}=props;

    const onLogin = (props) => {
        login(props.get('email'), props.get('password'), redirectUrl);
    };

    return (
        <div class="login">
            <ModulHeader/>
            <div className="login_section">
                <div className="login_section_center">
                    <SignInForm onLogin={onLogin} errors={errors} redirectUrl={redirectUrl} loading={loading}/>
                </div>
            </div>
        </div>
    );
};

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
        login: bindActionCreators(login.request, dispatch)
    }
}