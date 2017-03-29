import React from 'react';
import TransactionList from '../components/transactionList/TransactionList'

const TransactionsContainer = ({match}) => {
    return (
        <div>
            <TransactionList listId={'listHome'}></TransactionList>
            <TransactionList listId={'listSecond'}></TransactionList>
        </div>);
};

export default  TransactionsContainer
