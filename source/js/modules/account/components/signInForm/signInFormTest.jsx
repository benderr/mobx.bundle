import React from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {InputRender, FormGroup} from 'common/formElements/formComponents'
import {SButton} from 'common/uiElements/uiComponents';
import {validEmail, isEmpty} from 'common/validators/validators'

const isRequired = (...args) => isEmpty(...args) ? '*' : undefined;
const isValidEmail = (...args) => !validEmail(...args) ? 'invalid email' : undefined;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const asyncValidate = (values/*, dispatch */) => {
    return sleep(1000) // имитация серверного ответа
        .then(() => {
            if (!values.email) {
                // для асинхронной валидации нужно бросить объект с ошибкой
                throw {email: 'Поле обязательно для заполнения!'}
            } else if (values.phone.length > 10) {
                throw {email: 'Заголовок должен быть не более 10 символов!'}
            }
        })
};

export const focus = (...args) => {
    console.log(...args);
}

export const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required'
    }
    return errors
};

let SignInForm = props => {
    const {handleSubmit, pristine, reset, submitting} = props;
    const submit = (values) => console.log(values);

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="form">
                <FormGroup addon="@" >
                    <Field name="email" className="big" label="Email" component={InputRender}
                           validate={[isRequired, isValidEmail]} onFocus={focus}/>
                </FormGroup>
            </div>
            <button disabled={submitting} className="second button" type="submit">Send</button>
        </form> )
};

SignInForm = reduxForm({
    form: 'auth',// имя формы в state (state.form.auth)
    validate,
    //asyncValidate
})(SignInForm);

//попробовать связанные поля для валидации
export default SignInForm;
