import React from 'react';

var ListItem = (props) => {
    let item = props.item;
    return (<div className="table_list_row row_link">

        <div className="table_list_cell name" onClick={this.clickOnItem}>
            <div className="contragent">{item.name}</div>
            <div className="status info_label_success">{item.status}</div>
            <div className="purpose">{item.paymentPurpose}</div>
        </div>

        <div className="table_list_cell summ">
            <span className="money_expense">{item.amount} <span className="cur rur"><span>р.</span></span></span>
            <div className="account">Расчетный счет</div>
        </div>

        <div className="table_list_cell action">
            <a className="icon-reload"></a>
        </div>

        <div className="table_list_cell check">

        </div>


        <div className="clear"></div>
    </div>)
};

export default ListItem