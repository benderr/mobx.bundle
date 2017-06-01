import React from 'react';
import {Field} from 'redux-form/immutable';
import AmountRender from '../AmountRender'
import parseNumber from './parseNumber';

class AmountField extends React.Component {
    render() {
        return ( <Field type="text" parse={parseNumber} component={AmountRender} {...this.props}/>)
    }
}

export default AmountField