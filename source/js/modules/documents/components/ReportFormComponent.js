import React from 'react'
import PropTypes from 'prop-types'
import {reduxForm} from 'common/formElements'

import {InputField, DatePickerField} from 'common/formElements/fields'
// import DatePickerField from  "" //"common/uiElements/DatePickerField";


class ReportFormComponent extends React.Component {

	render() {
		const {handleSubmit, reportState, onSubmitForm, onCheckForEMail} = this.props;

		// console.log(reportState);

		return (
			<form onSubmit={handleSubmit(onSubmitForm)}>
				<div className="widget_block  report_request_form">
					<div>Выполнить отчет о продажах за период</div>
					<div className="date_selection">
						c
						<DatePickerField className="datetimepicker date_from" name="beginDate"/>
						по
						<DatePickerField className="datetimepicker date_to" name="endDate"/>
					</div>

					<div className="date_selection">
						<input type="checkbox"
							   name="isFromEmail"
							   id="21"
							   checked={reportState.isFromEmail}
							   onChange={onCheckForEMail}/>
						<label htmlFor="21" className="label_check">
							<i className="icon"/>
							<span>Отправить отчет на электронную почту</span>
						</label>
					</div>
					{reportState.isFromEmail && <div>
						<div className="property_value">
							<InputField className="w100"
										name="fromEmail"
										required="Укажите электронную почту" />
						</div>
					</div>}
					<div className="form_buttons">
						<button className="button middle">Сформировать</button>
					</div>

				</div>
			</form>
		)
	}
}

ReportFormComponent.propTypes = {
	reportState: PropTypes.object,
	onSubmitForm: PropTypes.func
};

ReportFormComponent = reduxForm({
	form: 'report_form'
})(ReportFormComponent);


export default ReportFormComponent;