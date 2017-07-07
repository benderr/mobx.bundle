import React from 'react';
import LoaderBlock from 'common/uiElements/LoaderBlock';


const columnList = [
	{code: 'code', cssClass: 'discount_id', name: 'Код', sort: true},
	{code: 'name', cssClass: 'discount_name', name: 'Название', sort: true},
	{code: 'value', cssClass: 'discount_size', name: 'Размер, %'},
	// {code: 'activate', cssClass: 'discount_status', name: 'Активность', noClick: true}
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
			<input type="search"
				   className="small w100"
				   onChange={props.onFilterChanged}
				   placeholder="Введите наименование" />
		</div>
	);
};
const TableBody = (props) => {
	const jsxRows = props.list.map((row, i) => {
		const jsxCols = columnList.map((col) => {
			let valueText = '';

			switch (col.code) {
				case ('activate'):
					let checkValue = true;
					valueText = (
						<div className="discount_status">
							<input name="stateIntegration" type="checkbox" id={`check_${col.code}_${i}`}
								   onChange={() => props.onCheckActive(row)} />
							<label htmlFor={`check_${col.code}_${i}`} className="label_check switcher">
								<i className="icon"/>
							</label>
						</div>
					);
					break;
				default: valueText = row[col.code];
			}
			return <div className={col.cssClass} onClick={() => !col.noClick && props.onOpenDetailLayout(row)} key={'col' + col.code}>{valueText}</div>
		});
		return <div className="table_row row_link" key={'row' + row.code}>{jsxCols}</div>
	});
	return <div>{jsxRows}</div>;
};

class DiscountListComponent extends React.Component {
	render() {
		const {
			listState,
			onFilterChanged, onCheckActive, onOpenDetailLayout, onSortList
		} = this.props;
		const noList = listState.list.length;

		return (
			<div className="widget_block">
				<div className="table table_discount">
					<TableHeader column={listState.column}
								 orderBy={listState.orderBy}
								 onSortList={onSortList} />

					<TableSearch onFilterChanged={onFilterChanged} />

					<TableBody list={listState.list}
							   onCheckActive={onCheckActive}
							   onOpenDetailLayout={onOpenDetailLayout} />

					{!noList && <div className='table_row center_xy'>По запросу ничего не найдено</div>}

					<LoaderBlock loading={listState.loading} />
				</div>
			</div>
		);
	}
}


export default DiscountListComponent;