import React from 'react';
import {reduxForm} from 'common/formElements';
import {InputField, PhoneField} from 'common/formElements/fields';
import {validEmail} from 'common/validators'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Recaptcha} from 'common/uiElements';

const isValidEmail = (text) => (...args) => !validEmail(...args) ? text : undefined;

const RegistrationForm = props => {
	const {handleSubmit, loading, onRegister, onCaptchaChange, onCaptchaLoad, errors, regData, captchaReady, captcha} = props;
	let existEmail = false;
	let defaultErrorText = '';

	const parseError = (error) => {
		if (!error)
			return '';
		const data = error.data || {};
		if (error.status == 401) {
			defaultErrorText = 'Неверный E-mail или пароль!';
		} else if (error.status == 400) {
			switch (data.type) {
				case 'exist':
					existEmail = true;
					break;
				default:
					defaultErrorText = 'Убедитесь что вы заполнили все поля верно';
					return;
			}
		} else {
			defaultErrorText = 'Произошла неизвестная ошибка.';
		}
	};

	parseError(errors);

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
											validate={[isValidEmail('Укажите корректную почту')]}
											required="Укажите Почту"/>
								<div class="input_title">Электронная почта</div>
							</div>
						</div>
					</div>
				</div>

				<div class="form_group">
					<Recaptcha
						sitekey="6LeJNhcUAAAAAEqqVK2197rndTkLHRDyh429W7rw"
						render="explicit"
						verifyCallback={onCaptchaChange}
						expiredCallback={onCaptchaChange}
						onloadCallback={onCaptchaLoad}
					/>
				</div>

				<div class="form_group">
					<div class="input_group_title w100">
						<InputField name="password"
									required="Укажите пароль"
									class="w100"/>
						<div class="input_title">Придумайте пароль для входа, не менее 8 символов</div>
					</div>
				</div>

				{defaultErrorText && <div className="form_error">{defaultErrorText}</div>}

				{!regData && <div class="form_buttons">
					<button disabled={loading || !captchaReady} className="button" type="submit">
						Зарегистрироваться
					</button>
				</div>
				}

				{existEmail && <div class="info_error info_error_icon">
					Пользователь с таким email уже зарегистрирован в системе. Вы можете <Link
					to="/signin">войти</Link>&nbsp;в систему или <Link to="/forgot">восстановить</Link> пароль
				</div>}

				{regData && <div class="info_success info_icon_success">
					Мы отправили письмо на указанную электронную почту. Для того, чтобы завершить регистрацию, перейдите
					по ссылке в письме. Ссылка будет работать 24 часа
				</div>}
			</div>
		</form>
	)
};

RegistrationForm.propTypes = {
	loading: PropTypes.bool.isRequired,
	captchaReady: PropTypes.bool.isRequired,
	onRegister: PropTypes.func.isRequired,
	onCaptchaChange: PropTypes.func.isRequired,
	onCaptchaLoad: PropTypes.func.isRequired,
	regData: PropTypes.bool,
	errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default  reduxForm({
	form: 'register'
})(RegistrationForm);

