import PropTypes from 'prop-types'

export default PropTypes.shape({
	beginDateTime: PropTypes.instanceOf(Date),
	docNum: PropTypes.string.isRequired,
	actualSum: PropTypes.number,
	baseSum: PropTypes.number,
	id: PropTypes.string,
	description: PropTypes.string
});