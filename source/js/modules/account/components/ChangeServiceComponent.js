import React from 'react';
import {reduxForm} from 'common/formElements';
import {InputField} from 'common/formElements/fields';
import {validPassword, validPasswordLength} from 'common/validators';
import PropTypes from 'prop-types';

const ChangeServiceComponent = props => {
	const {
		handleSubmit, onChangeService, onCheckIntegration,
		formState: {loading, success, errors, stateIntegration, msLogin, msPassword}
	} = props;
	console.log(loading, success, errors, stateIntegration, msLogin, msPassword);

	return (
		<form onSubmit={handleSubmit(onChangeService)}>
			<div className="form_group form_horizontal">
				<input type="checkbox" id="34"
					   name="stateIntegration"
					   onChange={onCheckIntegration}
					   value={stateIntegration}/>
				<label for="34" className="label_check switcher small">
					<i className="icon"/>
					<span>Интеграция с МойСклад</span>
				</label>
			</div>

			{stateIntegration && <div>
				<div className="light_block">
					<div className="form_group form_horizontal">
						<div className="property_label col">Логин</div>
						<div className="property_value col">
							<InputField name="msLogin" type="text" value={msLogin}
										required="Укажите логин"/>
						</div>
					</div>
					<div className="form_group form_horizontal">
						<div className="property_label col">Пароль</div>
						<div className="property_value col">
							<InputField name="msPassword" type="password" value={msPassword}
										required="Укажите пароль"/>
						</div>
					</div>
				</div>
				<div className="form_buttons row">
					<button className="button middle" disabled={loading || !stateIntegration}>
						Проверить и сохранить
					</button>
				</div>
			</div>}
		</form>
	)
};

ChangeServiceComponent.propTypes = {
	formState: PropTypes.shape({
		loading: PropTypes.bool.isRequired,
		success: PropTypes.bool,
		errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		stateIntegration: PropTypes.bool.isRequired,
		msLogin: PropTypes.string,
		msPassword: PropTypes.string
	}).isRequired,
	onChangeService: PropTypes.func.isRequired
};

export default  reduxForm({
	form: 'change_service'
})(ChangeServiceComponent);