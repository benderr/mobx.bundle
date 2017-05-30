import React from 'react';
import {Field} from 'redux-form/immutable';
import InputRender from 'common/formElements/InputRender'

const parser = (value) => {
    if (!value)
        return value;
    if (value.replace)
        value = value.replace(/[^\d]/g, '');
    return value;
};

class NumberField extends React.Component {
    render() {
        return ( <Field type="tel"
                        component={InputRender}
                        parse={parser} {...this.props}/>)
    }
}

export default NumberField