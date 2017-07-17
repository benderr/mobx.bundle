import React from 'react';
import {Field} from 'redux-form/immutable';
import InputRender from 'common/formElements/InputRender'
import parseNumber from './parseNumber';
import inputFieldShape from './inputFieldShape';
import {getRequiredValidator} from '../validationHelpers/formFieldHelpers'

class NumberField extends React.Component {
    render() {
        const {required, requiredDisable, validate = [], component = InputRender, ...props} =this.props;
        const validators = [...getRequiredValidator({required, requiredDisable}), ...validate];
        return ( <Field type="tel"
                        validate={validators}
                        component={component}
                        parse={parseNumber}
                        {...props}/>)
    }

    static propTypes = inputFieldShape
}

export default NumberField