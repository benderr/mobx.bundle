import React from 'react';

const SignInComponent = props => {
    const text = getText(props.name);
    return (
        <div className='SignIn'>
            <h2>Авторизация</h2>
            <hr />
            <div>{text}</div>
        </div>
    );
};

const getText = (name) => {
    return `Hello ${name}`
};

export default SignInComponent