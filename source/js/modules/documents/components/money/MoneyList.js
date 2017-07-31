import React from 'react'
import PropTypes from 'prop-types'
import {InfinateScroll} from 'common/uiElements'

import TableHead from './MoneyTableHead'
import TableSearch from './MoneyTableSearch'
import TableBody from './MoneyTableBody'


class MoneyList extends React.Component {
	render() {
		const {
			listState: {loading, sortField, sortDirection, listStep, list, q},
			onHeadSortClick, onFilterChanged, onInfinateScroll
		} = this.props;

		return (
			<div className="widget_block">
				<div className="table  table_docs">

					<TableHead onHeadSortClick={onHeadSortClick}
							   sortField={sortField}
							   sortDirection={sortDirection}/>
					<TableSearch onFilterChanged={onFilterChanged}
								 inputValue={q}/>
					<TableBody list={list}/>
					{!list.length && !loading &&
					<div className="searching_results">
						<div className="light_block">По запросу ничего не найдено</div>
					</div>}
					<InfinateScroll loadNext={onInfinateScroll}
									totalCount={list.length}
									listLength={listStep}
									loading={loading}/>
				</div>
			</div>
		)
	}
}

MoneyList.propTypes = {
	listState: PropTypes.shape({
		loading: PropTypes.bool,
		listStep: PropTypes.number, 				// кол-вы элементов за раз на вывод
		list: PropTypes.array.isRequired,			// список элементов
		sortField: PropTypes.string.isRequired,		// поле сортировки
		sortDirection: PropTypes.string.isRequired,	// направление сортировки
		q: PropTypes.string.isRequired, 			// поле поиска
	}),

	onHeadSortClick: PropTypes.func.isRequired,		// при клике на имя столбца
	onFilterChanged: PropTypes.func.isRequired,		// при вводе в поле поиска
	onInfinateScroll: PropTypes.func.isRequired 	// при прокрутке к концу страницы
};


export default MoneyList