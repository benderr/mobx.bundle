import React from 'react'
import PropTypes from 'prop-types'
import {isEmpty} from '../validators'

const NumberFormat = ({value, def = ''}) => {
	if (isEmpty(value))
		return def ? (<span>{def}</span>) : null;
	const formatted = cleanValue(value);
	return (<span>{formatted}</span>);
};

function cleanValue(val) {
	let value = val;
	if (!value.replace)
		value = value.toString();
	return value.replace(/[^0-9\.,]+/g, '').replace('.', ',');
}

NumberFormat.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	def: PropTypes.string
};

export  default NumberFormat;