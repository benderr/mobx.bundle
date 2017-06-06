import PropTypes from 'prop-types';
import modifierShape from './modifierShape'
const {shape, string, arrayOf, bool} = PropTypes;

export default shape({
	name: string.isRequired,
	required: bool,
	modifiers: arrayOf(modifierShape)
})
