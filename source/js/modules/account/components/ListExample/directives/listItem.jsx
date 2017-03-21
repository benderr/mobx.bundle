import React from 'react';

var ListItem = React.createClass({
    clickOnItem: ()=> {
        alert("test success!");
        console.log(this.state);
    },
    getInitialState: ()=>{
        return {
            testStateObj1: "hello",
            testStateObj2: {
                id: 1,
                name: "Тимур"
            }
        }
    },
    render: function () {
        var item = this.props.item;
        
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

            <div className="section_action_panel">
                <div className="selected">
                    <span className="light_text">Выбрано платежей:</span>
                    <strong>2</strong> на сумму <strong>34 847,00 <span className="cur rur">р.</span></strong>
                </div>
                <div className="action_panel_buttons">
                    <a className="icon-payment">Оплатить</a>
                    <a className="icon-pencil">Редактировать</a>
                    <a className="icon-cancel-doc">Отменить</a>
                    <a className="icon-trash-bin">Удалить</a>
                </div>
            </div>
            <div className="clear"></div>
        </div>);
    }
});

export default ListItem