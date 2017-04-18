import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {InputRender, FormGroup} from 'common/formElements/formComponents'
import {validEmail, isEmpty} from 'common/validators/validators'
import PropTypes from 'prop-types';


const isRequired = (text) => (...args) => isEmpty(...args) ? text : undefined;
const isValidEmail = (text) => (...args) => !validEmail(...args) ? text : undefined;

// export const asyncValidate = (values, dispatch, props, blurredField) => {
//     return sleep(1000) // имитация серверного ответа
//         .then(() => {
//             // if (!values.email) {
//             //     // для асинхронной валидации нужно бросить объект с ошибкой
//             //     throw {email: 'Поле обязательно для заполнения!'}
//             // } else if (values.phone.length > 10) {
//             //     throw {email: 'Заголовок должен быть не более 10 символов!'}
//             // }
//         })
// };

const validate = values => {
    //const errors = {};
    return null;
};

let SignInForm = props => {
    const {handleSubmit, loading, login, redirectUrl} = props;
    const submit = ({email, password}) => {
        //dispatch(login.request(email, password, backPath));
        login(email, password, redirectUrl);
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="form">
                <FormGroup addonClass="icon-mail">
                    <Field name="email" label="Email" component={InputRender}
                           validate={[isRequired('Укажите E-mail'), isValidEmail('Укажите корректный E-mail')]}
                           type="text"/>
                </FormGroup>
                <FormGroup addonClass="icon-password">
                    <Field name="password" label="Password" component={InputRender}
                           validate={[isRequired('Введите пароль')]} type="password"/>
                </FormGroup>
            </div>
            <button disabled={loading} className="second button" type="submit">Войти</button>
        </form> )
};

SignInForm.propTypes = {
    loading: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    redirectUrl: PropTypes.string
};

export default  reduxForm({
    form: 'auth',// имя формы в state (state.form.auth)
    validate,
    //asyncValidate
})(SignInForm);

