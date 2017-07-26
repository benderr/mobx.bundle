import React from 'react'
import PropTypes from 'prop-types';

const LoaderPanel = ({loading, children, className = 'poss'}) => {
	const classNames = [className, loading ? 'loading_block' : ''].join(' ');
	return (<div className={classNames}>{children}</div>)
};

LoaderPanel.propTypes = {
	loading: PropTypes.bool,
	className: PropTypes.string
};
export default LoaderPanel;