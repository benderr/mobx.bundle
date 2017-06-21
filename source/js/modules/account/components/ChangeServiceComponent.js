import React from 'react';
import {InputRender, reduxForm} from 'common/formElements';
import {connect} from 'react-redux';
import {Field} from 'redux-form/immutable';
import {InputField} from 'common/formElements/fields';
import {isRequired} from 'common/validators';
import PropTypes from 'prop-types';
import {ConfirmPopupService} from 'common/uiElements';

const isValidateLogin = val => /^admin@./i.test(val);
const validateLogin = (text) => (val) => !isValidateLogin(val) ? text : undefined;

class ChangeServiceComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidUpdate() {
		const {
			onSaveIntegration, onCancelIntegration,
			formState: {checked}
		} = this.props;

		if (checked) {
			this.removePopup.open({
				title: 'Вы хотите подтвердить операцию?',
				text: 'При интеграции с сервисом МойСклад, созданная структура торговых точек в Личном кабинете будет заменена на структуру МойСклад'
			}).then(() => onSaveIntegration()).catch(({close}) => {
				if (!close) onCancelIntegration();
			});
		}
	}

	render() {
		const {
			handleSubmit, onChangeService, onCheckIntegration,
			formState: {loading, success, errors, stateIntegration}
		} = this.props;
		console.log('ChangeServiceComponent', loading, success, errors, stateIntegration);

		return (
			<form onSubmit={handleSubmit(onChangeService)}>
				<div className="form_group form_horizontal">
					<input name="stateIntegration" type="checkbox" id="34"
						   checked={stateIntegration}
						   onChange={onCheckIntegration}/>
					<label for="34" className="label_check switcher small">
						<i className="icon"/>
						<span>Интеграция с МойСклад</span>
					</label>
				</div>

				{stateIntegration && <div className="light_block">
					<div className="form_group form_horizontal">
						<div className="property_label col">Логин</div>
						<div className="property_value col">
							<Field name="msLogin" type="text"
								   autocomplete="off"
								   validate={[isRequired('Укажите логин'), validateLogin('Не верный логин')]}
								   component={InputRender}/>
						</div>
					</div>
					<div className="form_group form_horizontal">
						<div className="property_label col">Пароль</div>
						<div className="property_value col">
							<Field name="msPassword" type="password"
								   autocomplete="off"
								   validate={[isRequired('Укажите пароль')]}
								   component={InputRender}/>
						</div>
					</div>
					{errors && <div className="info_error">Не удалось установить соединение</div>}
				</div>}

				<div className="form_buttons row">
					<button className="button middle" disabled={loading}>
						Проверить и сохранить
					</button>
				</div>
				<ConfirmPopupService
					ref={p => this.removePopup = p}
					okName="Подтвердить"
					cancelName="Отмена"
					title="Удаление тестовое"
					text="Вы действительно хотите что-то удалить?"/>
			</form>
		);
	}

}

ChangeServiceComponent.propTypes = {
	formState: PropTypes.shape({
		loading: PropTypes.bool.isRequired,
		success: PropTypes.bool,
		errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		stateIntegration: PropTypes.bool.isRequired,
		msLogin: PropTypes.string,
		msPassword: PropTypes.string
	}).isRequired,
	onChangeService: PropTypes.func.isRequired,
	onSaveIntegration: PropTypes.func.isRequired,
	onCancelIntegration: PropTypes.func.isRequired,
	onCheckIntegration: PropTypes.func.isRequired,
};

ChangeServiceComponent = reduxForm({
	form: 'changeService'
})(ChangeServiceComponent);

ChangeServiceComponent = connect(
	(state, props) => {
		return {
			initialValues: props.formState
		}
	}
)(ChangeServiceComponent);

export default ChangeServiceComponent;