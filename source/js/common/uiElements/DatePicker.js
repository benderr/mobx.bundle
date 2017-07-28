import React from 'react'
import {Field} from 'redux-form/immutable'
import {getRequiredValidator} from 'common/formElements/validationHelpers/formFieldHelpers'
import inputFieldShape from 'common/formElements/fields/inputFieldShape'

import moment from 'moment'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';

class DatePickerRender extends React.Component {
	handleChange(date) {
		this.props.input.onChange(moment(date).format(DEFAULT_DATE_FORMAT))
	}

	render() {
		const {input, dateFormat = DEFAULT_DATE_FORMAT, startDate, ...props} = this.props;
		const value = input.value || startDate || false;
		const selected = value ? moment(value, dateFormat) : null;

		return (
			<ReactDatePicker name={input.name}
							 ref={r => this.input = r}
							 dateFormat={dateFormat}
							 selected={selected}
							 onChange={::this.handleChange}
							 {...props} />
		);
	}
}


const DatePicker = ({required, requiredDisable, validate = [], ...props}) => {
	const validators = [...getRequiredValidator({required, requiredDisable}), ...validate];

	return <Field validate={validators}
				  component={DatePickerRender}
				  {...props} />
};


export default DatePicker;
