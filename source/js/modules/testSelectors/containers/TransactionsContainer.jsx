import React from 'react';
import TransactionList from '../components/transactionList/TransactionList'
import {Link} from 'react-router';

const TransactionsContainer = ({match}) => {
    return (
        <div>

            <TransactionList listId={'listHome'}/>
            <TransactionList listId={'listSecond'}/>

        </div>);
};

export default  TransactionsContainer

export const TransactionsContainer2 = ({match}) => {
    return (
        <div>
            
            <TransactionList listId={'listSecond'}/>

        </div>);
};
