import React from 'react';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {PhoneField} from 'common/formElements/formComponents'
import {SButton} from 'common/uiElements/uiComponents';

const required = value => value ? undefined : 'required';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
export const asyncValidate = (values/*, dispatch */) => {
    return sleep(1000) // имитация серверного ответа
        .then(() => {
            if (!values.title) {
                // для асинхронной валидации нужно бросить объект с ошибкой
                throw {phone: 'Поле обязательно для заполнения!'}
            } else if (values.phone.length > 10) {
                throw {phone: 'Заголовок должен быть не более 10 символов!'}
            }
        })
};

export const validate = values => {
    const errors = {}
    if (!values.phone) {
        errors.phone = 'Required'
    }

    return errors
};

let SignInForm = props => {
    const {handleSubmit, pristine, reset, submitting} = props

    return (
        <form onSubmit={handleSubmit}>
            <div className="form">
                <Field name="phone" className="big" label="Телефон" component={PhoneField}
                       validate={required}/>
            </div>
            <button disabled={submitting} className="second button" type="submit">Send</button>
        </form> )
};

SignInForm = reduxForm({
    form: 'auth',// имя формы в state (state.form.auth)
    validate,
    asyncValidate
})(SignInForm);

//попробовать связанные поля для валидации
export default SignInForm;