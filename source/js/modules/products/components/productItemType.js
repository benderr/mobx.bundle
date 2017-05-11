/**
 * Created by RobertSabiryanov on 11.05.17.
 */
import React from 'react';
const {shape, number, string} = React.PropTypes;

export default shape({
	code: number.isRequired,
	name: string.isRequired,
	price: number.isRequired
})
