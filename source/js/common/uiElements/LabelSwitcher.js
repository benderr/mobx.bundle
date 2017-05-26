import React from 'react'
import PropTypes from 'prop-types';

const LabelSwitcher = ({label, forElement}) => {
	return (
		<label for={forElement} className="label_check  switcher  m_top_15">
			<i className="icon"></i>
			<span class="m_left_45">{label}</span>
		</label>
	)
};

LabelSwitcher.propTypes = {
	label: PropTypes.string,
	forElement: PropTypes.string
};
export default LabelSwitcher;