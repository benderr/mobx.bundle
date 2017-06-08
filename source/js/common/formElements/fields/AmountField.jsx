import React from 'react';
import {Field} from 'redux-form/immutable';
import AmountRender from '../AmountRender'
import parseNumber from './parseNumber';

const AmountField = (props) => {
    return (<Field type="text" parse={parseNumber} component={AmountRender} {...props}/>)
};

export default AmountField;