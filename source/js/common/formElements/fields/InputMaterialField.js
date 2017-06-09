import React from 'react';
import {Field} from 'redux-form/immutable';
import InputRenderMaterialStyle from '../InputRenderMaterialStyle';
import PropTypes from 'prop-types';
import {getRequiredValidator} from '../validationHelpers/formFieldHelpers';

const InputMaterialField = ({type = 'text', component = InputRenderMaterialStyle, required, requiredDisable, validate = [], ...props}) => {
	const validators = [...getRequiredValidator({required, requiredDisable}), ...validate];
	return ( <Field type={type} component={component} validate={validators} {...props}/>);
};

InputMaterialField.propTypes = {
	name: PropTypes.string.isRequired,
	addonClass: PropTypes.string,
	format: PropTypes.func,
	normalize: PropTypes.func,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onDragStart: PropTypes.func,
	onDrop: PropTypes.func,
	parse: PropTypes.func,
	validate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
};

export default InputMaterialField;