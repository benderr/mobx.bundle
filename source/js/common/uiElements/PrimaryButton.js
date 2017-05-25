import React from 'react'
import PropTypes from 'prop-types';

const PrimaryButton = ({className, loading, type, ...props}) => {
	const buttonType = type || 'button';
	return (
		<button type={buttonType}
				disabled={loading}
				className={["button middle wide ", className || '', loading ? 'loader' : ''].join(' ')}
				{...props}>{props.children}</button>
	)
};

PrimaryButton.propTypes = {
	loading: PropTypes.bool,
	className: PropTypes.string,
	type: PropTypes.string
};


export default PrimaryButton;

