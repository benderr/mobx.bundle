import React from 'react';
import SignInForm from '../components/signInForm/signInFormTest'
import {Link} from 'react-router';

const SignInContainer = props => {
    return (
        <div className="wrap login">
            <div className="reg_header">
                <a href="/" className="logo">МодульБанк</a>
                <div className="title">Вход в систему</div>
            </div>
            <div className="reg_section">
                <div className="reg_article">
                    <SignInForm></SignInForm>
                    <Link to="/signin">
                        signin
                    </Link>
                    <br/>
                    <Link to="/signin/test/1">
                        test
                    </Link>
                </div>
            </div>
        </div>
    );
};


export default SignInContainer