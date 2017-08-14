import React from 'react'
import PropTypes from 'prop-types'
import {DateFormat, AmountFormat, SortLink, InfinateScroll} from 'common/uiElements'
import {NOT_VALUE} from "../../enums/optionsDocument"
import {DOCUMENT_TYPE_NAMES} from "../../../documents/enums"

class ChequeList extends React.Component {

	render() {
		const {
			listState, searchText,
			onHeadSortClick, onFilterChanged, onInfinateScroll
		} = this.props;
		const {list, sortField, sortDirection, loading} = listState;

		return (
			<div className="widget_block">
				<div className="table table_docs">

					<div className="table_head">
						<SortLink
							sortField={sortField}
							orderBy={sortDirection}
							onClick={onHeadSortClick}
							field="beginDateTime"
							className="doc_date">Дата создания</SortLink>
						<SortLink
							sortField={sortField}
							orderBy={sortDirection}
							onClick={onHeadSortClick}
							field="docType"
							className="doc_type">Тип документа</SortLink>
						<div className="doc_smena_number">Номер смены</div>
						<SortLink
							sortField={sortField}
							orderBy={sortDirection}
							onClick={onHeadSortClick}
							field="docNum"
							className="doc_number">Номер документа</SortLink>
						<SortLink
							sortField={sortField}
							orderBy={sortDirection}
							onClick={onHeadSortClick}
							field="actualSum"
							className="doc_amount">Сумма</SortLink>
						<SortLink
							sortField={sortField}
							orderBy={sortDirection}
							onClick={onHeadSortClick}
							field="cashier.name"
							className="doc_cashier">Кассир</SortLink>
					</div>

					<div className="table_row  row_link_search">
						<input type="search" className="small w100"
							   onChange={onFilterChanged} value={searchText}
							   placeholder="Введите наименование"/>
					</div>

					{list.map((Item, i) =>
						<div className="table_row"
							 key={`row_${Item.id}`}>
							<div className="doc_date"><DateFormat value={Item.beginDateTime}/></div>
							<div className="doc_type">{DOCUMENT_TYPE_NAMES[Item.docType] || NOT_VALUE}</div>
							<div
								className="doc_smena_number">{Item.shift && '' + Item.shift.shiftNum ? `Смена №${Item.shift.shiftNum}` : NOT_VALUE}</div>
							<div className="doc_number">Документ №{Item.docNum}</div>
							<div className="doc_amount"><AmountFormat value={Item.actualSum}/></div>
							<div className="doc_cashier">{Item.cashier ? Item.cashier.name : NOT_VALUE}</div>
						</div>
					)}

					{!list.length && !loading &&
					<div className="searching_results">
						<div className="light_block">По запросу ничего не найдено</div>
					</div>}

					<InfinateScroll
						loadNext={onInfinateScroll}
						totalCount={listState.total_count}
						listLength={list.length}
						loading={listState.loading}/>
				</div>
			</div>
		)
	}
}

ChequeList.propTypes = {
	listState: PropTypes.shape({
		list: PropTypes.array.isRequired,			// список элементов
		sortField: PropTypes.string.isRequired,		// поле сортировки
		sortDirection: PropTypes.string.isRequired,	// направление сортировки
	}),

	searchText: PropTypes.string, 			// поле поиска

	onHeadSortClick: PropTypes.func.isRequired,		// при клике на имя столбца
	onFilterChanged: PropTypes.func.isRequired,		// при вводе в поле поиска

};


export default ChequeList;