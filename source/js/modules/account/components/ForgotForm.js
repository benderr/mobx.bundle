import React from 'react';
import {reduxForm} from 'common/formElements';
import {InputField} from 'common/formElements/fields';
import {validEmail} from 'common/validators';
import PropTypes from 'prop-types';
const isValidEmail = (text) => (...args) => !validEmail(...args) ? text : undefined;

const ForgotForm = props => {
	const {handleSubmit, loading, isSent, onSendEmail, errors} = props;

	const getError = (error) => {
		if (!error)
			return '';
		return 'Мы не можем вам отправить ссылку для восстановления пароля. Пожалуйста, проверьте введенный адрес электронной почты.'
	};

	return (
		<form onSubmit={handleSubmit(onSendEmail)}>
			<div className="login_content">
				<p class="mb24">Для восстановления пароля укажите электронную почту, которую вы указали при
					регистрации</p>
				{!isSent && <div class="form_group">
					<div class="input_group light w100">
						<InputField name="email"
									label="Почта"
									type="text"
									required="Укажите E-mail"
									hideTips={true}
									validate={[isValidEmail('Укажите корректный E-mail')]}/>
						<div class="input_group_addon icon-mail"></div>
						<div class="input_light_border_bottom"></div>
					</div>
				</div>}

				{errors && <div className="form_error">{getError(errors)}</div>}

				{!isSent && <div className="form_buttons">
					<button disabled={loading} className="button" type="submit">Отправить</button>
				</div>}

				{isSent &&
				<div class="info_success info_icon_success">На вашу электронную почту, указанную при регистрации,
					отправлено письмо для смены пароля.
					Пожалуйста, перейдите по ссылке в письме. Ссылка действительна 24 часа.</div>}
			</div>
		</form>
	)
};

ForgotForm.propTypes = {
	loading: PropTypes.bool.isRequired,
	onSendEmail: PropTypes.func.isRequired,
	isSent: PropTypes.bool,
	errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default  reduxForm({
	form: 'forgot'// имя формы в state (state.form.auth)

})(ForgotForm);

