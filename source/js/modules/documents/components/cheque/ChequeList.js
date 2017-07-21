import React from 'react'
import PropTypes from 'prop-types'


const columnList = [
	{code: '1', cssClass: 'doc_date', name: 'Дата создания', sort: true},
	{code: '2', cssClass: 'doc_type', name: 'Тип документа', sort: true},
	{code: '3', cssClass: 'doc_smena_number', name: 'Номер смены', sort: true},
	{code: '4', cssClass: 'doc_number', name: 'Номер документа', sort: true},
	{code: '5', cssClass: 'doc_amount', name: 'Сумма', sort: true},
	{code: '6', cssClass: 'doc_cashier', name: 'Кассир', sort: true}
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
				   placeholder="Введите наименование" />
		</div>
	);
};
const TableBody = (props) => {
	const jsxRows = props.list.map(row => {
		const jsxCols = columnList.map(col => {
			let valueText = '';

			switch (col.code) {
				default:
					valueText = row[col.code];
			}

			return <div className={col.cssClass} key={'col' + col.code}>{valueText}</div>
		});
		return <div className="table_row row_link"
					key={`row_${row}`}
					onClick={() => props.onClickItem(row)}>{jsxCols}</div>
	});
	return <div>{jsxRows}</div>
};

class ChequeList extends React.Component {

	render() {
		const list = [];

		//region Testing data

		// ...header
		const onSortList = (code, by) => console.log('onSortList', code, by);
		const column = '1';
		const orderBy = 'asc';

		// ...input search
		const onFilterChanged = (e) => console.log('onFilterChanged', e);
		const inputValue = 'input search';

		// ...body
		const onClickItem = (row) => console.log('onClickItem', row);

		// endregion


		return (
			<div className="widget_block">
				<div className="table  table_docs">

					<TableHead onSortList={onSortList}
							   column={column}
							   orderBy={orderBy}/>

					<TableSearch onFilterChanged={onFilterChanged}
								 inputValue={inputValue}/>

					<TableBody list={list}
							   onClickItem={onClickItem}/>

				</div>
			</div>
		)
	}

}

ChequeList.propTypes = {
	onClickItem: PropTypes.func.isRequired
};


export default ChequeList;