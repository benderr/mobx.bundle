import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'common/formElements'
import {Button} from 'common/uiElements'
import {InputField, DatePickerField, Field} from 'common/formElements/fields'
import {focus} from 'redux-form/immutable'

let dateMin = null,
	dateMax = null;
const minIntervalDate = (text) => (val) => {
	dateMin = val;
	return dateMin !== null && dateMax !== null
		? (dateMin > dateMax ? text : undefined) : undefined;
};
const maxIntervalDate = (text) => (val) => {
	dateMax = val;
	return dateMin !== null && dateMax !== null
		? (dateMin > dateMax ? text : undefined) : undefined;
};

class ReportFormComponent extends React.Component {

	render() {
		const {handleSubmit, sendToEmail, onSubmitForm, sending, className, formErrors} = this.props;
		return (
			<form onSubmit={handleSubmit(onSubmitForm)} className={className}>

				<div>Выполнить отчет о продажах за период</div>
				<div className="date_selection">
					c
					<DatePickerField wrapperClassName="from-to"
									 required="Укажите период"
									 className="small date_from"
									 tipPlace="top"
									 validate={[minIntervalDate('Неверно выбран период формирования отчета')]}
									 name="beginDate"/>
					по
					<DatePickerField wrapperClassName="from-to"
									 required="Укажите период"
									 className="small date_to"
									 tipPlace="top"
									 validate={[maxIntervalDate('Неверно выбран период формирования отчета')]}
									 name="endDate"/>
				</div>

				<div className="send_to_email">
					<Field component="input" type="checkbox"
						   name="sendToEmail"
						   id="reportSendToEmail"/>
					<label htmlFor="reportSendToEmail" className="label_check">
						<i className="icon"/>
						<span>Отправить отчет на электронную почту</span>
					</label>
					{sendToEmail && <div class="send_to_address">
						<InputField className="small"
									name="email"
									type="email"
									label="Ваш электронный адрес"
									required="Укажите электронную почту"/>
					</div>}
				</div>
				<div className="form_buttons">
					<Button type="submit" loading={sending} className="button middle">Сформировать</Button>
				</div>
			</form>
		)
	}
}

ReportFormComponent.propTypes = {
	sendToEmail: PropTypes.bool,
	sending: PropTypes.bool.isRequired,
	onSubmitForm: PropTypes.func,
	formErrors: PropTypes.any
};

ReportFormComponent = reduxForm({
	form: 'report_form'
})(ReportFormComponent);


export default ReportFormComponent;