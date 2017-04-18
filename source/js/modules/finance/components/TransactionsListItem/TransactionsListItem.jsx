import React from 'react';
import {connect} from 'react-redux';
import actions from './../../actions/transactionsActions.js';
import {bindActionCreators} from 'redux';

function mapStateToProps(state) {
    return {
        transactionIsLoading: false
    }
}

const mapDispatchToProps = (dispatch) => ({
    clickOnItem: clickOnItem,
    repeatTransaction: bindActionCreators(actions.repeatTransaction, dispatch)
});

function clickOnItem() {

}

var TransactionsListItem = (props) => {

    var item = props.item;

    return (<div className="table_list_row row_link">

        <div className="table_list_cell name" onClick={() => props.clickOnItem()}>
            <div className="contragent">{item.name}</div>
            <div className="status info_label_success">{item.status}</div>
            <div className="purpose">{item.paymentPurpose}</div>
        </div>

        <div className="table_list_cell summ">
            <span className="money_expense">{item.amount} <span className="cur rur"><span>р.</span></span></span>
            <div className="account">Расчетный счет</div>
        </div>

        <div className="table_list_cell action">
            <a className="icon-reload" onClick={() => props.repeatTransaction(item.id)}></a>
        </div>

        <div className="table_list_cell check">

        </div>

        <div className="clear"></div>
    </div>);

};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsListItem)