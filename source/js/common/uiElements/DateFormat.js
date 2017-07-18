import React from 'react'
import dateHelper from '../helpers/dateHelper'

export default ({date, format = null, def = ''}) => {
	let formatDate = date;
	if (date && typeof date === 'string')
		formatDate = dateHelper.stringToDate(date);
	if (formatDate && formatDate instanceof Date)
		return (<span>{dateHelper.dateFormat(formatDate, format)}</span>)
	return (<span>{def}</span>);
}