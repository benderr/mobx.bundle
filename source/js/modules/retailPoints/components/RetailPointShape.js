import PropTypes from 'prop-types';
const {shape, number, string} = PropTypes;

export default shape({
	name: string.isRequired,
	address: string,
	settings: shape({
		aboutModulPosUrl: string
	})
})