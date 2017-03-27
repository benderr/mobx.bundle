import React from 'react';
import {SButton} from 'common/uiElements/uiComponents';
import TransactionItem from './TransactionItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getList, setFilter} from '../../actions/transactionActions';
import {getVisibleTransactions} from '../../selectors/transactionSelectors';

let TransactionListComponent = (props) => {
    return (
        <div className="table_list table_list_big transaction_list transaction_list_usn widget_block">
            <div className="table_list_body">
                {props.list.map((object, i) => <TransactionItem item={object} key={i}></TransactionItem>)}

                <div className="form_buttons a_center p_bot_10">
                    <SButton className='small'
                             onClick={() => props.setFilter(props.listId, 'SHOW_COMPLETED')}>
                        SHOW_COMPLETED
                    </SButton>
                    <SButton className="small"
                            onClick={() => props.setFilter(props.listId, 'SHOW_ACTIVE')}>
                        SHOW_ACTIVE
                    </SButton>
                    <SButton className="small"
                            onClick={() => props.setFilter(props.listId, 'SHOW_ALL')}>
                        SHOW_ALL
                    </SButton>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    getList: bindActionCreators(getList, dispatch),
    setFilter: bindActionCreators(setFilter, dispatch)
});

function mapStateToProps(state, props) {
    return {
        list: getVisibleTransactions(state, props)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TransactionListComponent);



