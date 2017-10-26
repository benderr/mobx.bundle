import React from 'react';
import {observer, inject} from 'mobx-react';
import {InfinateScroll, SortLink} from 'common/ui'
import {DateFormat, AmountFormat, LoaderPanel} from 'modul-components'
import {ContentPopup} from 'modul-components/lib/dialogs'
import InviteEmployee from '../InviteEmployee/InviteEmployee'

@observer
class EmployeeList extends React.Component {

  handleCloseInvite() {
    this.content && this.content.handleCloseClick();
  }

  handleOpenInvite() {
    this.content.open();
  }

  render() {
    const {className}=this.props;
    return (<div className={className}>
      <div class="role_settings">

        <ContentPopup ref={p => this.content = p}>
          <InviteEmployee onClose={::this.handleCloseInvite}/>
        </ContentPopup>

        <div class="f_right m_bot_10">
          <button class="button second small icon-user-full-add" onClick={::this.handleOpenInvite}>Пригласить агента</button>
          <button class="button small icon-group-half-add">Добавить группу</button>
        </div>

        <div style={{float: 'left'}} class="table_list table_list_small role_list">

          <div class="table_list_header">
            <div class="table_list_cell action">&nbsp;</div>
            <div class="table_list_cell admission">Доступ</div>
            <div class="table_list_cell group">Группа</div>
            <div class="table_list_cell role">Роль</div>

            <div class="table_list_cell name">Имя</div>

          </div>
          <div class="table_list_body">

            <div class="table_list_row">
              <div class="table_list_cell action"><a href="" class="trash icon-trash-bin notext"></a></div>
              <div class="table_list_cell admission"><a class="link_dashed"><span>1 портфель</span></a></div>
              <div class="table_list_cell group">-</div>
              <div class="table_list_cell role">
                {/*<div class="jsRadSelect2 select_inline" data-placeholder="Выбрать">*/}
                {/*<option class="jsRadSelect2Options" value="" selected>Администратор</option>*/}
                {/*<option class="jsRadSelect2Options" value="">Бизнес-ассистент</option>*/}
                {/*<option class="jsRadSelect2Options" value="">Бухгалтер</option>*/}
                {/*<option class="jsRadSelect2Options" value="">Юрист</option>*/}
                {/*</div>*/}

              </div>
              <div class="table_list_cell name"><span class="agent_status online"></span>Крикунов Владислав
                <div class="name_info">v.krikunov@modulbank.ru</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>)

  }
}


EmployeeList.propTypes = {
  // orders: PropTypes.arrayOf(OrderShape).isRequired,
  // totalCount: PropTypes.number,
  // loading: PropTypes.bool.isRequired,
  // sortField: PropTypes.string,
  // sortDirection: PropTypes.string,
  // start: PropTypes.number,
  // onLoadNext: PropTypes.func.isRequired,
  // onOpenOrder: PropTypes.func.isRequired,
  // onChangeFilter: PropTypes.func.isRequired,
  // onSort: PropTypes.func.isRequired
};


export default EmployeeList;