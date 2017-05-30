import React from 'react';
import {Field} from 'redux-form/immutable';
import InputRender from 'common/formElements/InputRender'
import normalizeAmount from 'common/formElements/fields/normalizeAmount'

const amountParser = (value) => {
    if (!value)
        return value;
    if (value.replace)
        value = value.replace(/[^\d]/g, '');
    return parseFloat(value);
};

class AmountField extends React.Component {
    render() {
        return ( <Field type="tel"
                        component={InputRender}
                        normalize={normalizeAmount}
                        parse={amountParser} {...this.props}/>)
    }
}

export default AmountField