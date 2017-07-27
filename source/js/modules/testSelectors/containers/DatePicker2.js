import React from 'react'
import {InputField} from 'common/formElements/fields'
import {reduxForm} from 'common/formElements'

import DatePicker from 'common/uiElements/DatePicker'

class DatePicker2 extends React.Component {

	render() {
		const {handleSubmit} = this.props;

		return (
			<form onSubmit={handleSubmit((props) => console.log('onSubmit', props.toJS()))}>
				<h3>DatePicker</h3>

				<InputField name="password" className="w100"/>
				<DatePicker name="one" required="asd" />

				<div>
					<button className="button small">Перерендер формы</button>
				</div>
			</form>
		)
	}
}

export default reduxForm({form: 'date-picker-2'})(DatePicker2);