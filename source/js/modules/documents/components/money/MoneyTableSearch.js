import React from 'react'
import PropTypes from 'prop-types'

const MoneyTableSearch = ({onFilterChanged, inputValue}) => {
	return (
		<div className="table_row row_link_search">
			<input type="search" className="small w100"
				   onChange={onFilterChanged} value={inputValue}
				   placeholder="Введите наименование"/>
		</div>
	)
};

MoneyTableSearch.propTypes = {
	onFilterChanged: PropTypes.func.isRequired,
	inputValue: PropTypes.string.isRequired
};


export default MoneyTableSearch