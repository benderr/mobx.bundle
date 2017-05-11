import React from 'react';
import SignInForm from '../components/signInForm/SignInForm'
import {connect} from 'react-redux';
import {login} from '../actions/loginActions'
import {bindActionCreators} from 'redux';


const SignInContainer = props => {
    const {loading, login, redirectUrl}=props;
    return (
        <div className="login_section">
            <div className="login_section_center">
                <SignInForm login={login} redirectUrl={redirectUrl} loading={loading}></SignInForm>
            </div>
        </div>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);


function mapStateToProps(state, ownProps) {
    return {
        loading: state.auth.get('loading'),
        errors: state.auth.get('authError'),
        redirectUrl: '/' //ownProps.location.query && ownProps.location.query.redirectUrl || null
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login.request, dispatch)
    }
}