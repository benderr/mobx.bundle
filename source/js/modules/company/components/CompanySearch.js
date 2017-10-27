import React from 'react';
import {computed} from 'mobx'
import {observer, inject} from 'mobx-react';
import {InfinateScroll, SortLink} from 'common/ui'
import {DateFormat, AmountFormat, LoaderPanel} from 'modul-components'
import {PhoneField} from 'common/form/fields'
import {ContentPopup} from 'modul-components/lib/dialogs'

@observer
class CompanySearch extends React.Component {

  handleOpenBill(id) {

  }

  handleSearchBill(e){

  }

  @computed get rows() {
    let orderRows = [];
    for (let i = 1; i < 20; i++) {
      orderRows.push({
        id: i,
        date: new Date(),
        number: 'Test number = ' + i,
        description: 'description' + i,
        sum: 10 * i
      });
    }
    return orderRows.map(order => (
      <div key={order.id} class="table_row  row_link" onClick={() => this.handleOpenBill(order.id)}>
        <div class="doc_date"><DateFormat value={order.date} format="dd.mm.yyyy HH:MM"/></div>
        <div class="doc_number">{order.number}</div>
        <div class="doc_amount"><AmountFormat value={order.sum}/></div>
        <div class="doc_comment">{order.description}</div>
      </div>));
  }

  render() {

    const {className}=this.props;

    return (<div>
        <div className="form">
          <div className="form_group">
            <div className="input_group_title mr4">
              <div class="input_title">Введите телефон:</div>
              {/*<PhoneField />*/}
              <input type="text" className="w100"/>
            </div>
            <div className="input_group_title mr4">
              <div class="input_title">Введите инн:</div>
              {/*<PhoneField />*/}
              <input type="text" className="w100"/>
            </div>
            <button className="button middle">Найти</button>
          </div>

        </div>
        <div className="row">
          <div className="col eight">
            <div class="widget_block">
              <div class="table  table_docs">
                <div class="table_head">
                  <span>Операции</span>
                  {/*<SortLink className="doc_date"*/}
                  {/*field='beginDateTime'*/}
                  {/*sortField={sortField}*/}
                  {/*orderBy={sortDirection}*/}
                  {/*onClick={onSort}>Дата создания</SortLink>*/}
                  {/*<SortLink className="doc_number"*/}
                  {/*field='docNum'*/}
                  {/*sortField={sortField}*/}
                  {/*orderBy={sortDirection}*/}
                  {/*onClick={onSort}>Номер документа</SortLink>*/}
                  {/*<SortLink className="doc_amount"*/}
                  {/*field='actualSum'*/}
                  {/*sortField={sortField}*/}
                  {/*orderBy={sortDirection}*/}
                  {/*onClick={onSort}>Сумма</SortLink>*/}
                  {/*<SortLink className="doc_cashier"*/}
                  {/*field='cashier.name'*/}
                  {/*sortField={sortField}*/}
                  {/*orderBy={sortDirection}*/}
                  {/*onClick={onSort}>Кассир</SortLink>*/}
                  {/*<div class="doc_comment">Комментарий</div>*/}
                </div>
                <div class="table_row  row_link_search">
                  <input type="search" class="small  w100"
                         placeholder="Введите текст поиска"
                         onChange={::this.handleSearchBill}/>
                </div>
                <LoaderPanel loading={false}
                             style={{minHeight: '40px'}}
                             className=''>
                  {this.rows}
                </LoaderPanel>
                {/*{notFound}*/}
                {/*<InfinateScroll loadNext={onLoadNext}*/}
                {/*totalCount={totalCount}*/}
                {/*listLength={orders.length}*/}
                {/*loading={loadingBottom}/>*/}
              </div>
            </div>
          </div>
          <div className="col four">
            <div className="widget_block">
              <div className="side_filter">
                <div class="side_filter_name">Компания</div>
                <span>ООО "Кирпичи"</span>
              </div>
              <div className="side_filter">
                <div class="side_filter_name">Продает</div>
                <span>Кирпичи</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default CompanySearch;