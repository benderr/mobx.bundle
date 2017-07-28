import React from 'react'
import {Field} from 'redux-form/immutable'
import {getRequiredValidator} from 'common/formElements/validationHelpers/formFieldHelpers'
import inputFieldShape from 'common/formElements/fields/inputFieldShape'

import DatePickerRender from './DatePickerRender'


const DatePickerField = ({required, requiredDisable, validate = [], ...props}) => {
	const validators = [...getRequiredValidator({required, requiredDisable}), ...validate];

	return <Field validate={validators}
				  component={DatePickerRender}
				  {...props} />
};

DatePickerField.propTypes = inputFieldShape;


export default DatePickerField;