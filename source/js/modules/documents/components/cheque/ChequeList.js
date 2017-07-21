import React from 'react'
import PropTypes from 'prop-types'
import {DateFormat, AmountFormat} from 'common/uiElements'


const columnList = [
	{code: 'beginDateTime', cssClass: 'doc_date', name: 'Дата создания', sort: true, fn},
	{code: 'docType', cssClass: 'doc_type', name: 'Тип документа', sort: true},
	// {code: '3', cssClass: 'doc_smena_number', name: 'Номер смены', sort: true},
	{code: 'docNum', cssClass: 'doc_number', name: 'Номер документа', sort: true},
	{code: 'actualSum', cssClass: 'doc_amount', name: 'Сумма', sort: true},
	{code: 'cashier', cssClass: 'doc_cashier', name: 'Кассир', sort: true}
];

const TableHead = (props) => {
	const jsxHeader = columnList.map(head => {
		let className = head.cssClass;

		if (head.sort) {
			let by = (props.column === head.code ? (props.orderBy === 'asc' ? 'desc' : 'asc') : 'asc');
			className += (props.column === head.code ? ' icon-sort-' + (props.orderBy === 'asc' ? 'up' : 'down') : '');

			return (
				<a key={'head' + head.code}
				   className={className}
				   onClick={() => props.onSortList(head.code, by)}
				>{head.name}</a>
			);
		}
		else return <div key={head.code} className={head.cssClass}>{head.name}</div>
	});

	return <div className="table_head">{jsxHeader}</div>
};
const TableSearch = (props) => {
	return (
		<div className="table_row  row_link_search">
			<input type="search"
				   className="small w100"
				   onChange={props.onFilterChanged}
				   value={props.inputValue}
				   placeholder="Введите наименование"/>
		</div>
	);
};
const TableBody = (props) => {
	const jsxRows = props.list.map((row, i) => {
		const jsxCols = columnList.map(col => {
			let valueText = '123';

			// Валидация полей
			switch (col.code) {
				case ('beginDateTime'):
					valueText = <DateFormat value={row.beginDateTime}/>
					break;
				case ('actualSum'):
					valueText = <AmountFormat value={row.actualSum}/>
					break;
				case ('cashier'):
					valueText = row.cashier.name;
					break;
				default: valueText = row[col.code];
			}

			return <div className={col.cssClass} key={'col' + col.code}>{valueText}</div>
		});

		return <div className="table_row row_link"
					key={`row_${row.id}`}
					onClick={() => props.onClickItem(row)}>{jsxCols}</div>
	});
	return <div>{jsxRows}</div>
};

class ChequeList extends React.Component {

	render() {
		const {
			listState: {list, sortField, sortDirection, q},
			onHeadSortClick, onFilterChanged, onBodyItemClick
		} = this.props;

		return (
			<div className="widget_block">
				<div className="table  table_docs">

					<TableHead onSortList={onHeadSortClick}
							   column={sortField}
							   orderBy={sortDirection}/>
					<TableSearch onFilterChanged={onFilterChanged}
								 inputValue={q}/>
					<TableBody list={list}
							   onClickItem={onBodyItemClick}/>

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
		q: PropTypes.string.isRequired, 			// поле поиска
	}),

	onHeadSortClick: PropTypes.func.isRequired,		// при клике на имя столбца
	onFilterChanged: PropTypes.func.isRequired,		// при вводе в поле поиска
	onBodyItemClick: PropTypes.func.isRequired,		// при клике элемент таблицы

};


export default ChequeList;