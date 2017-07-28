import React from 'react'

import moment from 'moment'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const DEFAULT_DATE_FORMAT = 'DD.MM.YYYY';

class DatePickerRender extends React.Component {
	render() {
		const {input, dateFormat = DEFAULT_DATE_FORMAT, startDate, ...props} = this.props;
		const value = (input && input.value ? input.value : false) || startDate || false;
		const selected = value ? moment(value, dateFormat) : null;

		return (
			<ReactDatePicker {...input}
							 dateFormat={dateFormat}
							 selected={selected}
							 {...props} />
		);
	}
}


export default DatePickerRender;