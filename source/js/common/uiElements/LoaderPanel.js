import React from 'react'
import PropTypes from 'prop-types';

const LoaderPanel = ({loading, children, className}) => {
	const classNames = [className, loading ? 'loading_block' : ''].join(' ');
	return (<div className={classNames}>{children}</div>)
};

LoaderPanel.defaultProps = {
	className: 'poss'
};


LoaderPanel.propTypes = {
	loading: PropTypes.bool,
	className: PropTypes.string
};
export default LoaderPanel;