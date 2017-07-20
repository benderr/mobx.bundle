import React from 'react'
import PropTypes from 'prop-types'
import {isEmpty} from '../validators'
import accounting from 'accounting';

const CURRENCY_LIST = {
	'USD': '$',
	'RUR': '₽'
};

const AmountFormat = ({value, currency = 'RUR', def = ''}) => {
	if (isEmpty(value))
		return (<span>{def}</span>);
	const val = parseFloat(cleanValue(value));
	const formatted = !isNaN(val) ? accounting.formatNumber(val, 2, " ") : def;
	const cur = currency ? CURRENCY_LIST[currency] : '';
	return (<span>{formatted}&nbsp;{cur}</span>);
};

function cleanValue(val) {
	return val.replace ? val.replace(/[^0-9\.,]+/g, '').replace(',', '.') : val;
}

AmountFormat.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	currency: PropTypes.oneOf(Object.keys(CURRENCY_LIST)),
	def: PropTypes.string
};

export  default AmountFormat;