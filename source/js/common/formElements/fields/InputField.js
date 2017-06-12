import React from 'react';
import {Field} from 'redux-form/immutable';
import InputRender from '../InputRender';
import PropTypes from 'prop-types';

const InputField = ({type = 'text', component = InputRender, ...props}) => {
	return ( <Field type={type} component={component} {...props}/>);
};

InputField.propTypes = {
	name: PropTypes.string.isRequired,
	format: PropTypes.func,
	normalize: PropTypes.func,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onDragStart: PropTypes.func,
	onDrop: PropTypes.func,
	parse: PropTypes.func,
	validate: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.func)]),
}

export default InputField;