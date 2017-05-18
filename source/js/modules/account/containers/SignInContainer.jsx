import React from 'react';
import SignInForm from '../components/SignInForm/SignInForm'
import {connect} from 'react-redux';
import {login} from '../actions/loginActions'
import {bindActionCreators} from 'redux';


const SignInContainer = props => {
    const {loading, login, redirectUrl, errors}=props;
    return (
        <div className="login_section">
            <div className="login_section_center">
                <SignInForm onLogin={login} errors={errors} redirectUrl={redirectUrl} loading={loading}/>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);


function mapStateToProps(state, ownProps) {
    return {
        loading: state.auth.get('loading'), //todo сделать селекторы
        errors: state.auth.get('authError'),
        redirectUrl: '/' //todo ownProps.location.query && ownProps.location.query.redirectUrl || null
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login.request, dispatch)
    }
}