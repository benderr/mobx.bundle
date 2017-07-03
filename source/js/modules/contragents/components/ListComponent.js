import React from 'react';


const TableHeader = (props) => {
	return (
		<div className="table_head">
			<a className="contragent_number icon-sort-down">№</a>
			<a className="contragent_name icon-sort-up">Наименование контрагента</a>
			<a className="contragent_status icon-sort-up">Статус</a>
			<div className="contragent_role">Роль</div>
		</div>
	);
};
const TableSearch = (props) => {
	return (
		<div className="table_row row_link_search">
			<input type="search" className="small w100" placeholder="Наименование, код, роль или логин" />
		</div>
	);
};
const TableBody = (props) => {
	return (
		<div className="table_row row_link">
			<div className="contragent_number">e4b407a5-54ee-11e7-7a6c-d2a9001e8b9f</div>
			<div className="contragent_name">Бензин услуга</div>
			<div className="contragent_status">Активный</div>
			<div className="contragent_role">Поставщик, Поставщик услуг</div>
		</div>
	);
};


class ListComponent extends React.Component {
	render() {
		return (
			<div className="widget_block">
				<div className="table table_contragents">
					<TableHeader />
					<TableSearch />
					<TableBody />
				</div>
			</div>
		);
	}
}


export default ListComponent;