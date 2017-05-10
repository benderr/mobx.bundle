import React from 'react';
import {connect} from 'react-redux';
import TransactionsListItem from './../TransactionsListItem/TransactionsListItem.jsx';
import actions from './../../actions/transactionsActions.js';
import financeDataContext from './../../bl/financeDataContext.js';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

function mapStateToProps(state) {
    return {
        listArr: state.finance.get('transactionsList')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTransactionsByThunk: getTransactionsByThunk,
        getTransactionsBySaga: bindActionCreators(actions.getTransactionsBySaga, dispatch)
    };

    function getTransactionsByThunk() {
        const asyncGet = () => {
            return dispatch => {
                financeDataContext.getTransactionsList()
                    .then((res) => {
                        dispatch(actions.updateTransactionsList(res));
                    });
            }
        };
        dispatch(asyncGet());

    }
};

var TransactionsList = (props) => {
    var listArr = props.listArr ? props.listArr : [];
    return (
        <div>
            <div class="table_list table_list_big transaction_list transaction_list_usn widget_block">

                <div class="table_list_body">

                    <div class="table_list_row row_date">
                        <div class="table_list_cell name">12 марта 2016</div>
                        <div class="table_list_cell summ">Остаток: 423 125 000,00 <span
                            class="cur rur"><span>р.</span></span></div>
                        <div class="table_list_cell action"></div>
                        <div class="table_list_cell check"></div>
                    </div>

                    {listArr.map(function (object, i) {
                        return <TransactionsListItem item={object} key={i}></TransactionsListItem>;
                    })}

                    <div class="table_row_info">
                        <div class="info_center">
                            <p>Отображены все операции, соответствующие установленным фильтрам.</p>
                        </div>
                        <div>
                            <a onClick={props.getTransactionsByThunk}>
                                Получить новый список через redux-thunk
                            </a>
                            <br />
                            <a onClick={props.getTransactionsBySaga}>
                                Получить новый список через redux-sags
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsList)