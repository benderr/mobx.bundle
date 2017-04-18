import React from 'react';
import SignInForm from '../components/signInForm/SignInForm'
import {connect} from 'react-redux';
import {login} from '../actions/loginActions'
import {bindActionCreators} from 'redux';


const SignInContainer = props => {
    const {loading, login, redirectUrl}=props;
    return (
        <div className="wrap login">
            <div className="reg_header">
                <a href="/" className="logo">МодульБанк</a>
                <div className="title">Вход в систему</div>
            </div>
            <div className="reg_section">
                <div className="reg_article">
                    <SignInForm login={login} redirectUrl={redirectUrl} loading={loading}></SignInForm>
                </div>
            </div>
        </div>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);


function mapStateToProps(state, ownProps) {
    return {
        loading: state.auth.get('loading'),
        errors: state.auth.get('authError'),
        redirectUrl: ownProps.location.query && ownProps.location.query.redirectUrl || null
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login.request, dispatch)
    }
}