import React from 'react'
import TitlePanel from '../components/TitlePanel'
import TitleActions from '../components/TitleActions'
import ListFilter from '../components/ListFilter';

class ExternalListContainer extends React.Component {

	handleOpenFilter() {
		this.filter.open();
	}

	render() {
		return (
			<div>
				<TitlePanel>
					<TitleActions onClick={::this.handleOpenFilter}/>
				</TitlePanel>

				<ListFilter ref={filter => this.filter = filter}>
					<div class="side_filter">
						<div class="side_filter_name">Тип документа</div>
						<ul>
							<li>
								<input type="checkbox" name="tfilter" id="ff11" class="input_check"/>
								<label for="ff11" class="label_check"><i
									class="icon"></i><span>Продажа</span></label>
							</li>
							<li>
								<input type="checkbox" name="tfilter" id="ff2" class="input_check"/>
								<label for="ff2" class="label_check"><i
									class="icon"></i><span>Продажа по внешнему чеку</span></label>
							</li>
							<li>
								<input type="checkbox" name="tfilter" id="ff3" class="input_check"/>
								<label for="ff3" class="label_check"><i
									class="icon"></i><span>Возврат</span></label>
							</li>
							<li>
								<input type="checkbox" name="tfilter" id="ff4" class="input_check"/>
								<label for="ff4" class="label_check"><i
									class="icon"></i><span>Инвентаризация</span></label>
							</li>
							<li>
								<input type="checkbox" name="tfilter" id="ff5" class="input_check"/>
								<label for="ff5" class="label_check"><i
									class="icon"></i><span>Возврат поставщику</span></label>
							</li>
							<li>
								<input type="checkbox" name="tfilter" id="ff6" class="input_check"/>
								<label for="ff6" class="label_check"><i
									class="icon"></i><span>Чек возврата продажи</span></label>
							</li>
							<li>
								<input type="checkbox" name="tfilter" id="ff6" class="input_check"/>
								<label for="ff6" class="label_check"><i class="icon"></i><span>Заказ</span></label>
							</li>
						</ul>
					</div>
				</ListFilter>

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
							<input type="search" className="small  w100" placeholder="Кассир, номер документа или сумма"
								   value={'ExternalListContainer'}/>
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

export default ExternalListContainer;