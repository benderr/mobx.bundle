import React from 'react';
import TransactionList from '../components/transactionList/TransactionList'
import InternalLayout from 'components/InternalLayout.jsx'

const TransactionsContainer = (props) => {
    return (
        <InternalLayout>
            <TransactionList listId={'listHome'}></TransactionList>

            <TransactionList listId={'listSecond'}></TransactionList>
        </InternalLayout>);
};

export default  TransactionsContainer
