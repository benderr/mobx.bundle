/**
 * Created by RobertSabiryanov on 24.05.17.
 */
import React from 'react';
import {Field} from 'redux-form/immutable';
import InputRender from 'common/formElements/InputRender'
import normalizePhone from 'common/formElements/fields/normalizePhone'

const phoneParser = (value) => {
    return value.replace(/[^\d]/g, '');
}

class PhoneField extends React.Component {
    render() {
        // normalize={normalizePhone}
        return ( <Field type="tel" maxLength="10"
                        class="w100"
                        component={InputRender}
                        normalize={normalizePhone}
                        parse={phoneParser} {...this.props}/>)
    }
}

export default PhoneField