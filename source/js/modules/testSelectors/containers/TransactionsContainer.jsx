import React from 'react';
import TransactionList from '../components/transactionList/TransactionList'
import {Link} from 'react-router-dom';

class TransactionsContainer extends React.Component {

    mustRender = this.props.mustRender;

    shouldComponentUpdate(nextProps, nextState){
        return nextProps.mustRender;
    }

    render() {
        console.log('TransactionsContainer render');
        return (
            <div>
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

            <TransactionList listId={'listSecond'}/>

        </div>);
};
