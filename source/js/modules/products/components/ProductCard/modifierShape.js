import PropTypes from 'prop-types';
const {shape, string, number, bool} = PropTypes;
import MODIFIER_GROUP_TYPE from '../../enums/modifierGroupType'

export default shape({
	name: string,
	barcode: string,
	qty: number.isRequired,
	price: number,
	groupType: PropTypes.oneOf([MODIFIER_GROUP_TYPE.REQUIRED, MODIFIER_GROUP_TYPE.OPTIONAL])
})
