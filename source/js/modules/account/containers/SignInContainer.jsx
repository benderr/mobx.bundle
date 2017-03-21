import React from 'react';
import SignInForm from '../components/signInForm'

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
                </div>
                <div className="login_links">
                    <a href="#">Забыли пароль?</a>
                    <a href="#">Зарегистрироваться</a>
                </div>
            </div>
        </div>
    );
};


export default SignInContainer