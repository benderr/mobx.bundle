/**
 * Created by RobertSabiryanov on 11.05.17.
 */
import PropTypes from 'prop-types';
const {shape, number, string} = PropTypes;

export default shape({
	code: number.isRequired,
	name: string.isRequired,
	price: number.isRequired
})
