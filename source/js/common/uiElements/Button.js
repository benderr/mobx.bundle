import React from 'react'
import PropTypes from 'prop-types';

const Button = ({loading, className, type, ...props}) => {
	const buttonType = type || 'button';
	return (
		<button type={buttonType}
				disabled={loading}
				className={[className || '', loading ? 'loader' : ''].join(' ')}
				{...props}>{props.children}</button>
	)
};

Button.propTypes = {
	loading: PropTypes.bool,
	className: PropTypes.string,
	type: PropTypes.string
};


export default Button;

