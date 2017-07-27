import React from 'react'

class IShopListContainer extends React.Component {


	render() {
		return (
			<div>


				<div className="widget_block">
					<div className="table  table_docs">
						<div className="table_head">
							<div className="doc_date">Дата создания</div>
							<div className="doc_type">Тип документа</div>
							<div className="doc_smena_number">Номер смены</div>
							<div className="doc_number">Номер документа</div>
							<div className="doc_amount">Сумма</div>
							<div className="doc_cashier">Кассир</div>
						</div>

						<div className="table_row  row_link_search">
							<input type="search" className="small  w100" placeholder="Кассир, номер документа или сумма" value={'IShopListContainer'} />
						</div>

						<div className="table_row  row_link">
							<div className="doc_date">22.06.2016, 23:37:46</div>
							<div className="doc_type">Возврат</div>
							<div className="doc_smena_number">Смена №1</div>
							<div className="doc_number">Документ №12</div>
							<div className="doc_amount">106,00 ₽</div>
							<div className="doc_cashier">Быцаева Любовь</div>
						</div>
						<div className="table_row  row_link">
							<div className="doc_date">31.07.2016, 17:12:12</div>
							<div className="doc_type">Продажа</div>
							<div className="doc_smena_number">Смена №1</div>
							<div className="doc_number">Документ №11</div>
							<div className="doc_amount">396,00 ₽</div>
							<div className="doc_cashier">Быцаева Любовь</div>
						</div>
						<div className="table_row  row_link">
							<div className="doc_date">31.07.2016, 17:12:12</div>
							<div className="doc_type">Продажа</div>
							<div className="doc_smena_number">Смена №1</div>
							<div className="doc_number">Документ №10</div>
							<div className="doc_amount">396,00 ₽</div>
							<div className="doc_cashier">Быцаева Любовь</div>
						</div>
					</div>
				</div>

			</div>
		);
	}

}

export default IShopListContainer;