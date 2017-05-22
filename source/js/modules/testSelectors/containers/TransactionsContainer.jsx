import React from 'react';
import TransactionList from '../components/transactionList/TransactionList'
import {Link} from 'react-router-dom';

class TransactionsContainer extends React.Component {

    mustRender = this.props.mustRender;

    render() {
        console.log('TransactionsContainer render');
        return (
            <div>
                listHome
                <TransactionList listId={'listHome'}/>
                {/*<TransactionList listId={'listSecond'}/>*/}
            </div>);
    }
}

export default  TransactionsContainer

export const TransactionsContainer2 = () => {
    console.log('TransactionsContainer2 render');
    return (
        <div>
            listSecond
            <TransactionList listId={'listSecond'}/>
        </div>);
};
