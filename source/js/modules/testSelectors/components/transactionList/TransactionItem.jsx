import React from 'react';

var ListItem = (props) => {
    let item = props.item;
    return (<div class="table_list_row row_link">

        <div class="table_list_cell name" onClick={this.clickOnItem}>
            <div class="contragent">{item.name}</div>
            <div class="status info_label_success">{item.status}</div>
            <div class="purpose">{item.paymentPurpose}</div>
        </div>

        <div class="table_list_cell summ">
            <span class="money_expense">{item.amount} <span class="cur rur"><span>р.</span></span></span>
            <div class="account">Расчетный счет</div>
        </div>

        <div class="table_list_cell action">
            <a class="icon-reload"></a>
        </div>

        <div class="table_list_cell check">

        </div>


        <div class="clear"></div>
    </div>)
};

export default ListItem