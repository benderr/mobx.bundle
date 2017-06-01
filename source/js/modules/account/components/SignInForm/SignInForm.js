import React from 'react';
import {Field, reduxForm} from 'redux-form/immutable';
import InputRender from './InputRenderSign'
import {validEmail, isRequired} from 'common/validators'
import PropTypes from 'prop-types';

const isValidEmail = (text) => (...args) => !validEmail(...args) ? text : undefined;

const SignInForm = props => {
	const {handleSubmit, loading, onLogin, redirectUrl, errors} = props;
	const submit = (props) => {
		onLogin(props);
	};

	const getError = (error) => {
		if (!error)
			return '';
		if (error.get('status') == 401)
			return 'Неверный E-mail или пароль!';
		return 'Произошла неизвестная ошибка.'
	};

	return (
		<form onSubmit={handleSubmit(submit)}>
			<div className="login_content">
				<div className="login_auth_block">

					<Field name="email" label="Электронная почта" type="text"
						   addonClass="icon-mail"
						   component={InputRender}
						   validate={[isRequired('Укажите E-mail'), isValidEmail('Укажите корректный E-mail')]}/>
					<Field name="password" label="Пароль" type="password"
						   addonClass="icon-password"
						   component={InputRender}
						   validate={[isRequired('Введите пароль')]}/>

					{/*Блок ошибок*/}
					<div className="form_error">{getError(errors)}</div>

					{/*/!*Блок каптча - раскомментировать если нужно*!/*/}
					{/*<div class="captcha">*/}
					{/*<p>А вы, часом, не робот?<br/>Если нет, введите текст с картинки</p>*/}
					{/*<div class="captcha_left">*/}
					{/*<input type="text" name="" id="" placeholder="Введите код" class="small" /> */}
					{/*<a href="#">Обновить код</a>*/}
					{/*</div>*/}
					{/*<img src="https://yastatic.net/doccenter/images/tech-ru/cleanweb/freeze/0WLRscWa-KXnsJM3K9jyjORMUEc.gif" alt="" width="140" height="50">*/}
					{/*</div> */}
					<div className="form_buttons">
						<button disabled={loading} className="button" type="submit">Далее</button>
					</div>
				</div>
			</div>
			<div className="login_links">
				<a>Восстановить пароль</a>
			</div>
		</form>
	)
};

SignInForm.propTypes = {
	loading: PropTypes.bool.isRequired,
	onLogin: PropTypes.func.isRequired,
	redirectUrl: PropTypes.string,
	errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default  reduxForm({
	form: 'auth'// имя формы в state (state.form.auth)

})(SignInForm);

