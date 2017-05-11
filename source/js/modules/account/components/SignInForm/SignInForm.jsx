import React from 'react';
import {Field, reduxForm} from 'redux-form';
import InputRender from './InputRenderSign'
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
        <div>
            <div className="login_content">
                <div className="login_auth_block">
                    <form onSubmit={handleSubmit(submit)}>

                        <Field name="email" label="Email" type="text"
                               addonClass="icon-mail"
                               component={InputRender}
                               validate={[isRequired('Укажите E-mail'), isValidEmail('Укажите корректный E-mail')]}/>
                        <Field name="password" label="Password" type="password"
                               addonClass="icon-mail"
                               component={InputRender}
                               validate={[isRequired('Введите пароль')]}/>

                        {/*Блок ошибок*/}
                        {/*<div class="form_error">Неверный номер телефона или пароль!</div>*/}

                        {/*/!*Блок каптча - раскомментировать если нужно*!/*/}
                        {/*<div class="captcha">*/}
                        {/*<p>А вы, часом, не робот?<br/>Если нет, введите текст с картинки</p>*/}
                        {/*<div class="captcha_left">*/}
                        {/*<input type="text" name="" id="" placeholder="Введите код" class="small" /> */}
                        {/*<a href="#">Обновить код</a>*/}
                        {/*</div>*/}
                        {/*<img src="https://yastatic.net/doccenter/images/tech-ru/cleanweb/freeze/0WLRscWa-KXnsJM3K9jyjORMUEc.gif" alt="" width="140" height="50">*/}
                        {/*</div> */}

                    </form>
                    <div className="form_buttons">
                        <button disabled={loading} className="button" type="submit">Далее</button>
                    </div>
                </div>
            </div>
            <div className="login_links">
                <a>Восстановить пароль</a>
            </div>
        </div>
    )
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

