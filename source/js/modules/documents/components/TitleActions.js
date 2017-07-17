import React from 'react'
import PropTypes from 'prop-types'
const TitleActions = ({onClick}) => {
	return (
		<div className="title_actions">
			<a className="button small light icon-filter show_filter_panel  right20" onClick={onClick}>Фильтры</a>
			<a className="button white icon-filter show_filter_panel float  right20" onClick={onClick}>
				<span className="filter_count"/>
			</a>
		</div>
	);
};

TitleActions.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default TitleActions;