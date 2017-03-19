import React from 'react';
import InternalLayout from 'views/Base/InternalLayout';
import ListItem from 'views/ListExample/directives/ListItem';

var ListExampleComponent = React.createClass({
    render: function () {

        var listArr = [{
            id: "1",
            name: "ООО Башнефть",
            amount: 450000,
            paymentPurpose: "Доход от продажи акций Роснефти",
            status: "Оплачен"
        },
            {
                id: "2",
                name: "ЗАО Сода",
                amount: 480000,
                paymentPurpose: "Доход от продажи акций Microsoft",
                status: "Оплачен"
            },
            {
                id: "3",
                name: "ООО Роснефть",
                amount: 78000,
                paymentPurpose: "Доход от продажи акций Башнефти",
                status: "Оплачен"
            }];

        return (
            <InternalLayout>
                <div className="table_list table_list_big transaction_list transaction_list_usn widget_block">

                    <div className="table_list_body">

                        <div className="table_list_row row_date">
                            <div className="table_list_cell name">12 марта 2016</div>
                            <div className="table_list_cell summ">Остаток: 423 125 000,00 <span
                                className="cur rur"><span>р.</span></span></div>
                            <div className="table_list_cell action"></div>
                            <div className="table_list_cell check"></div>
                        </div>

                        {listArr.map(function (object, i) {
                            return <ListItem item={object} key={i}></ListItem>;
                        })}

                        <div className="table_row_info">
                            <div className="info_center">
                                <p>Отображены все операции, соответствующие установленным фильтрам.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </InternalLayout>);
    }
});

export default ListExampleComponent