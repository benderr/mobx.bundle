import React from 'react'
import * as oprions from '../enums/contragentOptions'


const columnList = [
	{code: 'name', cssClass: 'contragent_name', name: 'Наименование контрагента', sort: true},
	{code: 'locked', cssClass: 'contragent_status', name: 'Статус', sort: true},
	{code: 'roles', cssClass: 'contragent_role', name: 'Роль'}
];

const TableHeader = (props) => {
	const jsxHeader = columnList.map((head) => {
		let className = head.cssClass;

		if (head.sort) {
			let by = (props.column === head.code ? (props.orderBy === 'asc' ? 'desc' : 'asc') : 'asc');
			className += (props.column === head.code ? ' icon-sort-' + (props.orderBy === 'asc' ? 'up' : 'down') : '');

			return (
				<a key={'head' + head.code} className={className} onClick={() => props.onSortList(head.code, by)}>
					{head.name}
				</a>
			);
		}
		else return <div key={head.code} className={head.cssClass}>{head.name}</div>
	});

	return <div className="table_head">{jsxHeader}</div>
};
const TableSearch = (props) => {
	return (
		<div className="table_row row_link_search">
			<input type="search" className="small w100" placeholder="Наименование, код, роль или логин" />
		</div>
	);
};
const TableBody = (props) => {
	const jsxRows = props.list.map((row, i) => {
		const jsxCols = columnList.map((col) => {
			let valueText = '';

			switch (col.code) {
				case ('locked'):
					valueText = row.locked == 'on' ? 'Неактивный' : 'Активный';
					break;
				case ('roles'):
					row.roles.forEach((role) => {
						valueText += (valueText.length > 0 ? ', ' : '') + (oprions.roles[role].label || role);
					});
					break;
				default:
					valueText = row[col.code];
			}
			return <div className={col.cssClass} key={'col' + col.code}>{valueText}</div>
		});
		return <div className="table_row row_link" onClick={() => props.onOpenDetailLayout(row)} key={'row' + row.code}>{jsxCols}</div>
	});
	return <div>{jsxRows}</div>;
};


class ListComponent extends React.Component {
	render() {
		const {listState, onOpenDetailLayout, onSortList} = this.props;

		return (
			<div className="widget_block">
				<div className="table table_contragents">
					<TableHeader column={listState.column}
								 orderBy={listState.orderBy}
								 onSortList={onSortList} />
					<TableSearch />
					<TableBody list={listState.list}
							   onOpenDetailLayout={onOpenDetailLayout} />
				</div>
			</div>
		);
	}
}


export default ListComponent;