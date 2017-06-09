import React from 'react';
import {reduxForm} from 'common/formElements';
import {InputField, PhoneField} from 'common/formElements/fields';
import {validEmail} from 'common/validators'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const isValidEmail = (text) => (...args) => !validEmail(...args) ? text : undefined;

const RegistrationForm = props => {
	const {handleSubmit, loading, onRegister, errors} = props;

	const getError = (error) => {
		if (!error)
			return '';
		if (error.get('status') == 401)
			return 'Неверный E-mail или пароль!';
		return 'Произошла неизвестная ошибка.'
	};

	return (
		<form onSubmit={handleSubmit(onRegister)} noValidate={true} autoComplete={false}>
			<div class="login_title">Регистрация компании</div>
			<div className="login_content">

				<div class="form_group">
					<div class="input_group_title w100">
						<InputField name="company"
									class="w100"
									required="Укажите Название компании"/>
						<div class="input_title">Название компании</div>
					</div>
				</div>

				<div class="row">
					<div class="col half">
						<div class="form_group">
							<div class="input_group_title w100">
								<InputField name="name"
											class="w100"
											required="Укажите Имя владельца"/>
								<div class="input_title">Имя владельца</div>
							</div>
						</div>
					</div>
					<div class="col half">
						<div class="form_group">
							<div class="input_group_title w100">
								<InputField name="surname"
											class="w100"
											required="Укажите Фамилию"/>
								<div class="input_title">Фамилия</div>
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col half">
						<div class="form_group">
							<div class="input_group_title w100">
								<div class="input_group w100">
									<div class="input_group_addon addon_code">+7</div>
									<PhoneField name="phone"
												required="Укажите Телефон"/>
								</div>
								<div class="input_title">Телефон</div>
							</div>
						</div>
					</div>
					<div class="col half">
						<div class="form_group">
							<div class="input_group_title w100">
								<InputField name="email" class="w100"
											required="Укажите Почту"/>
								<div class="input_title">Электронная почта</div>
							</div>
						</div>
					</div>
				</div>


				<div class="form_group">
					<div class="input_group_title w100">
						<InputField name="password"
									type="password"
									required="Укажите пароль"
									class="w100"
						/>
						<div class="input_title">Придумайте пароль для входа, не менее 8 символов</div>
					</div>
				</div>

				<div className="form_error">{getError(errors)}</div>

				<div class="form_buttons">
					<button disabled={loading} className="button" type="submit">Зарегистрироваться</button>
				</div>

				{/*<!-- Успешная отправка – отображать вместо кнопки отправить (.form_buttons), остальные поля заблокировать-->*/}

				{/*<div class="info_success info_icon_success">*/}
				{/*Мы отправили письмо на указанную электронную почту. Для того, чтобы завершить регистрацию, перейдите по ссылке в письме. Ссылка будет работать 24 часа*/}
				{/*</div>*/}


			</div>
		</form>
	)
};

RegistrationForm.propTypes = {
	loading: PropTypes.bool.isRequired,
	onRegister: PropTypes.func.isRequired,
	errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default  reduxForm({
	form: 'register'
})(RegistrationForm);

