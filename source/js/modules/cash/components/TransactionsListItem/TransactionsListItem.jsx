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

    return (<div class="table_list_row row_link">

        <div class="table_list_cell name" onClick={() => props.clickOnItem()}>
            <div class="contragent">{item.name}</div>
            <div class="status info_label_success">{item.status}</div>
            <div class="purpose">{item.paymentPurpose}</div>
        </div>

        <div class="table_list_cell summ">
            <span class="money_expense">{item.amount} <span class="cur rur"><span>р.</span></span></span>
            <div class="account">Расчетный счет</div>
        </div>

        <div class="table_list_cell action">
            <a class="icon-reload" onClick={() => props.repeatTransaction(item.id)}></a>
        </div>

        <div class="table_list_cell check">

        </div>

        <div class="clear"></div>
    </div>);

};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsListItem)