import React from 'react'
import PropTypes from 'prop-types'

const HotKeyBackFromCategory = ({className, onBackFromCategory}) => {
	const _className = [className, 'back_from_category'].join(' ');
	return (
		<div className={_className}>
			<div className="cell">
				<a className="back"
				   onClick={onBackFromCategory}></a>
			</div>
		</div>
	);
};

HotKeyBackFromCategory.propTypes = {
	onBackFromCategory: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired
};

export default HotKeyBackFromCategory;

