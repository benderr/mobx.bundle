import React from 'react';
import {reduxForm} from 'common/formElements';
import {connect} from 'react-redux';
import {InputField} from 'common/formElements/fields';
import PropTypes from 'prop-types';
import {ConfirmPopupService} from 'common/uiElements';
import {LoaderPanel, Button} from 'common/uiElements';

const isValidateLogin = val => /^admin@./i.test(val);
const validateLogin = (text) => (val) => !isValidateLogin(val) ? text : undefined;

class ChangeServiceComponent extends React.Component {

	componentDidUpdate() {
		const {
			onSaveIntegration, onCancelIntegration,
			formState: {checked, stateIntegration}
		} = this.props;

		if (checked && stateIntegration) {
			this.removePopup.open().then(() => {
				onSaveIntegration();
			}).catch(({close}) => {
				if (!close) onCancelIntegration();
			});
		}
	}

	componentWillUnmount() {
		const {onDefStateIntegration} = this.props;
		onDefStateIntegration();
	}

	renderError() {
		const {formState:{disableStateErrors, connectErrors, stateErrors}} =this.props;
		let errorText = '';
		if (stateErrors) {
			errorText = 'Ошибка при получении состояния интеграции'
		} else if (disableStateErrors) {
			errorText = 'Ошибка при выполнении операции'
		} else if (connectErrors) {
			errorText = 'Не удалось установить соединение';
		}

		if (errorText)
			return (<div className="info_error">{errorText}</div>);
		return null;
	}

	render() {
		const {
			handleSubmit, onChangeService, onCheckIntegration,
			formState: {loading, success, errors, stateIntegration, msLogin, msPassword}
		} = this.props;

		return (
			<LoaderPanel loading={loading}>
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
								<InputField name="msLogin" type="text"
											required="Укажите логин"
											validate={[validateLogin('Не верный логин')]}/>
							</div>
						</div>
						<div className="form_group form_horizontal">
							<div className="property_label col">Пароль</div>
							<div className="property_value col">
								<InputField name="msPassword" type="password"
											required="Укажите пароль"/>
							</div>
						</div>
					</div>}

					{this.renderError()}
					{success && <div className="info">Настройки сохранены</div>}

					<div className="form_buttons row">
						<Button type="submit" className="button middle" disabled={loading}>
							Проверить и сохранить
						</Button>
					</div>
					<ConfirmPopupService
						ref={p => this.removePopup = p}
						title="Вы хотите подтвердить операцию?"
						text="При интеграции с сервисом МойСклад, созданная структура торговых точек в Личном кабинете будет заменена на структуру МойСклад"
						okName="Подтвердить"
						cancelName="Отмена"/>
				</form>
			</LoaderPanel>
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
	onDefStateIntegration: PropTypes.func.isRequired
};

ChangeServiceComponent = reduxForm({
	form: 'changeService',
	enableReinitialize: true
})(ChangeServiceComponent);

ChangeServiceComponent = connect(
	(state, props) => {
		return {
			initialValues: props.formState
		}
	}
)(ChangeServiceComponent);

export default ChangeServiceComponent;