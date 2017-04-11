import React from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {InputRender, FormGroup} from 'common/formElements/formComponents'
//import {SButton} from 'common/uiElements/uiComponents';
import {validEmail, isEmpty} from 'common/validators/validators'
import {login, logOut} from '../../actions/loginActions'
const isRequired = (text) => (...args) => isEmpty(...args) ? text : undefined;
const isValidEmail = (text) => (...args) => !validEmail(...args) ? text : undefined;
import {connect} from 'react-redux';

//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// export const asyncValidate = (values, dispatch, props, blurredField) => {
//     return sleep(1000) // имитация серверного ответа
//         .then(() => {
//             console.log(blurredField);
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
    const {handleSubmit, pristine, reset, submitting, touch, dispatch, loading, authData} = props;
    const submit = ({email, password}) => {
        dispatch(login.request(email, password));
    };

    const _logOut = () => {
        dispatch(logOut())
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
                           validate={[isRequired('Введите пароль')]} onFocus={focus} type="password"/>
                </FormGroup>
            </div>
            {authData && authData.get('token')}
            <button disabled={loading} className="second button" type="submit">Войти</button>
            {authData && authData.get('token') &&
            <button disabled={loading} className="second button" onClick={_logOut} type="button">Выход</button>
            }
        </form> )
};

SignInForm = reduxForm({
    form: 'auth',// имя формы в state (state.form.auth)
    validate,
    //asyncValidate
})(SignInForm);

//попробовать связанные поля для валидации
//export default SignInForm;

export default connect(mapStateToProps)(SignInForm);


function mapStateToProps(state) {
    return {
        loading: state.account.get('loading'),
        authError: state.account.get('authError'),
        authData: state.account.get('authData')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // testAsync: bindActionCreators(testAsync, dispatch),
        // testAction: bindActionCreators(testAction, dispatch),
        // testSetter: bindActionCreators(testSetter, dispatch)
    }
}