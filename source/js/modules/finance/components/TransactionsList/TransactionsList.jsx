import React from 'react';
import {connect} from 'react-redux';
import InternalLayout from 'components/InternalLayout';
import TransactionsListIem from './../TransactionsListItem/TransactionsListItem.jsx';
import actions from './../../actions/transactionsActions.js';
import financeDataContext from './../../bl/financeDataContext.js';

function mapStateToProps(state) {
    return {
        listArr: state.finance.get('transactionsList')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTransactions: getTransactions
    };

    function getTransactions() {
        financeDataContext.getTransactionsList()
            .then(dispatch(actions.updateTransactionsList()));
    }
};

var TransactionsList = (props) => {
    var listArr = props.listArr ? props.listArr : [];
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
                        return <TransactionsListIem item={object} key={i}></TransactionsListIem>;
                    })}

                    <div className="table_row_info">
                        <div className="info_center">
                            <p>Отображены все операции, соответствующие установленным фильтрам.</p>
                        </div>
                        <div>
                            <a onClick={props.getTransactions}>
                                Получить новый список
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </InternalLayout>);
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList)