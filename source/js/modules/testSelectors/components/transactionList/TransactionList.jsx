import React from 'react';
import {SButton} from 'common/uiElements/uiComponents';
import TransactionItem from './TransactionItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setFilter, setCompleted, setData} from '../../actions/transactionActions';
import {createSelectors, getLayer} from '../../selectors/transactionSelectors';

const mapDispatchToProps = (dispatch) => ({
    setFilter: bindActionCreators(setFilter, dispatch),
    setCompleted: bindActionCreators(setCompleted, dispatch),
    setData: bindActionCreators(setData, dispatch)
});

// const makeMapStateToProps = () => {
//     //const selectors = createSelectors();
//
//     const mapStateToProps = (state, props) => {
//         window[props.listId]=getLayer(state, {key: props.listId});
//         return {
//             // list: selectors.getVisibleTransactions(state, props),
//             // total: selectors.getTotalSum(state, props),
//             layer: getLayer(state, {key: props.listId})
//         }
//     };
//     return mapStateToProps;
// };

const mapStateToProps = (state, props) => {
    const itm = getLayer(state, {key: props.listId});

    console.log('В сторе ', props.listId, itm, ' и сторы ', itm === window[props.listId]);

    window[props.listId] = itm;
    return {
        // list: selectors.getVisibleTransactions(state, props),
        // total: selectors.getTotalSum(state, props),
        layer: getLayer(state, {key: props.listId})
    }
};

const TransactionListComponent = (props) => {
    console.log('TransactionListComponent render', props.listId);
    return (
        <div class="table_list table_list_big transaction_list transaction_list_usn widget_block">
            <div class="table_list_body">
                {/*Total: {props.total}*/}
                {/*{props.list.map((object, i) => <TransactionItem item={object} key={i}></TransactionItem>)}*/}

                {JSON.stringify(props.layer ? props.layer.toJS() : {})}
                <div class="form_buttons a_center p_bot_10">
                    {/*<SButton class='small'*/}
                    {/*onClick={() => props.setFilter(props.listId, 'SHOW_COMPLETED')}>*/}
                    {/*SHOW_COMPLETED*/}
                    {/*</SButton>*/}
                    {/*<SButton class="small"*/}
                    {/*onClick={() => props.setFilter(props.listId, 'SHOW_ACTIVE')}>*/}
                    {/*SHOW_ACTIVE*/}
                    {/*</SButton>*/}
                    {/*<SButton class="small"*/}
                    {/*onClick={() => props.setFilter(props.listId, 'SHOW_ALL')}>*/}
                    {/*SHOW_ALL*/}
                    {/*</SButton>*/}
                    {/*<SButton class="small"*/}
                    {/*onClick={() => props.setCompleted(props.listId)}>*/}
                    {/*SET_COMPLETED*/}
                    {/*</SButton>*/}

                    <SButton class="small"
                             onClick={() => props.setData({
                                 key: props.listId, data: {
                                     id: 1,
                                     name: 'Test',
                                     date: new Date(),
                                     amount: 12,
                                     status: 'Incompleted',
                                     completed: false
                                 }
                             })}>
                        SET_COMPLETED
                    </SButton>
                </div>
            </div>
        </div>
    );
};


export default connect(mapStateToProps, mapDispatchToProps)(TransactionListComponent);



