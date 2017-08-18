import React from 'react';
import {Field} from 'redux-form/immutable';
import AmountRender from '../AmountRender'
import {parseNumber} from '../../helpers/numberHelper';
import inputFieldShape from './inputFieldShape';
import {getRequiredValidator} from '../validationHelpers/formFieldHelpers'

const AmountField = ({required, requiredDisable, validate = [], ...props}) => {
    const validators = [...getRequiredValidator({required, requiredDisable}), ...validate];
    return (<Field type="text" parse={parseNumber}
                   component={AmountRender}
                   validate={validators}
                   {...props}
    />)
};

AmountField.propTypes = inputFieldShape;

export default AmountField;