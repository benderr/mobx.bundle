import React from 'react';
import InternalLayout from 'components/InternalLayout';
import TransactionItem from './TransactionItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getList, setFilter} from '../../actions/transactionActions';
import {getVisibleTransactions} from '../../selectors/transactionSelectors';

let TransactionListComponent = (props) => {
    return (
        <div className="table_list table_list_big transaction_list transaction_list_usn widget_block">
            <div className="table_list_body">

                {props.list.map((object, i) => {
                    return <TransactionItem item={object} key={i}></TransactionItem>;
                })}
                <button className="button second full"
                        onClick={() => props.dispatch(setFilter(props.listId, 'SHOW_COMPLETED'))}>
                    SHOW_COMPLETED
                </button>
                <button className="button second full"
                        onClick={() => props.dispatch(setFilter(props.listId, 'SHOW_ACTIVE'))}>
                    SHOW_ACTIVE
                </button>
                <button className="button second full"
                        onClick={() => props.dispatch(setFilter(props.listId, 'SHOW_ALL'))}>
                    SHOW_ALL
                </button>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionListComponent);


function mapStateToProps(state, props) {
    return {
        list: getVisibleTransactions(state, props)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getList: bindActionCreators(getList, dispatch),
        dispatch: dispatch
    }
}