import React from 'react';
import {Field} from 'redux-form/immutable';
import InputRender from '../InputRender';
import inputFieldShape from './inputFieldShape';
import {getRequiredValidator} from '../validationHelpers/formFieldHelpers'

const InputField = ({type = 'text', component = InputRender, required, requiredDisable, validate = [], ...props}) => {
	const validators = [...getRequiredValidator({required, requiredDisable}), ...validate];
	return (<Field type={type}
				   validate={validators}
				   component={component}
				   {...props}/>);
};

InputField.propTypes = inputFieldShape;

export default InputField;