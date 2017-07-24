import React from 'react'
import PropTypes from 'prop-types'

const TitleActions = ({
	onShowFilter = () => {
	}, showFilter = false, children
}) => {
	return (
		<div className="title_actions">
			{children}
			{showFilter &&
			<a className="button small light icon-filter show_filter_panel  right20" onClick={onShowFilter}>Фильтры</a>}
			{showFilter &&
			<a className="button white icon-filter show_filter_panel float  right20" onClick={onShowFilter}>
				<span className="filter_count"/>
			</a>}
		</div>
	);
};

TitleActions.propTypes = {
	onShowFilter: PropTypes.func,
	showFilter: PropTypes.bool
};

export default TitleActions;