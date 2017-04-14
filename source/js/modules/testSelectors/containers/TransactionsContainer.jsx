import React from 'react';
import TransactionList from '../components/transactionList/TransactionList'
import {Link} from 'react-router';

const TransactionsContainer = ({match}) => {
    return (
        <div>
            <ul>
                <li className="active"><Link to="/list-example"><span>Sel1</span></Link></li>
                <li><Link to="/list-example2">Sel1</Link></li>
                <li><Link to="/list-example2/second">Sel3</Link></li>
                <li><Link to="/finance">Fin</Link></li>
            </ul>
            <TransactionList listId={'listHome'}/>
            <TransactionList listId={'listSecond'}/>

        </div>);
};

export default  TransactionsContainer

export const TransactionsContainer2 = ({match}) => {
    return (
        <div>
            <ul>
                <li className="active"><Link to="/list-example"><span>Sel1</span></Link></li>
                <li><Link to="/list-example2">Sel1</Link></li>
                <li><Link to="/list-example2/second">Sel3</Link></li>
                <li><Link to="/finance">Fin</Link></li>
            </ul>
            <TransactionList listId={'listSecond'}/>

        </div>);
};
