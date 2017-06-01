import PropTypes from 'prop-types';
const {shape, string, number, bool} = PropTypes;

export default shape({
	name: string.isRequired,
	barcode: string.isRequired,
	qty: number.isRequired,
	price: number.isRequired,
	selected: bool
})
