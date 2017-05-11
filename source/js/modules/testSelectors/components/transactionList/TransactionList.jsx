import React from 'react';
import {SButton} from 'common/uiElements/uiComponents';
import TransactionItem from './TransactionItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFilter, setCompleted} from '../../actions/transactionActions';
import {createSelectors} from '../../selectors/transactionSelectors';

const mapDispatchToProps = (dispatch) => ({
    setFilter: bindActionCreators(setFilter, dispatch),
    setCompleted: bindActionCreators(setCompleted, dispatch)
});

const makeMapStateToProps = () => {
    const selectors = createSelectors();

    const mapStateToProps = (state, props) => {
        return {
            list: selectors.getVisibleTransactions(state, props),
            total: selectors.getTotalSum(state, props)
        }
    };
    return mapStateToProps;
};

const TransactionListComponent = (props) => {
    console.log('TransactionListComponent render');
    return (
        <div class="table_list table_list_big transaction_list transaction_list_usn widget_block">
            <div class="table_list_body">
                Total: {props.total}
                {props.list.map((object, i) => <TransactionItem item={object} key={i}></TransactionItem>)}

                <div class="form_buttons a_center p_bot_10">
                    <SButton class='small'
                             onClick={() => props.setFilter(props.listId, 'SHOW_COMPLETED')}>
                        SHOW_COMPLETED
                    </SButton>
                    <SButton class="small"
                             onClick={() => props.setFilter(props.listId, 'SHOW_ACTIVE')}>
                        SHOW_ACTIVE
                    </SButton>
                    <SButton class="small"
                             onClick={() => props.setFilter(props.listId, 'SHOW_ALL')}>
                        SHOW_ALL
                    </SButton>
                    <SButton class="small"
                             onClick={() => props.setCompleted(props.listId)}>
                        SET_COMPLETED
                    </SButton>
                </div>
            </div>
        </div>
    );
};


export default connect(makeMapStateToProps, mapDispatchToProps)(TransactionListComponent);



