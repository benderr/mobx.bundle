import React from 'react';
import {Field} from 'redux-form/immutable';
import InputRender from 'common/formElements/InputRender'
import parseNumber from './parseNumber';

class NumberField extends React.Component {
    render() {
        return ( <Field type="tel"
                        component={InputRender}
                        parse={parseNumber} {...this.props}/>)
    }
}

export default NumberField