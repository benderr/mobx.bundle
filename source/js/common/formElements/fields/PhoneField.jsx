import React from 'react';
import {Field} from 'redux-form/immutable';
import InputRender from '../InputRender'
import normalizePhone from './normalizePhone'
import inputFieldShape from './inputFieldShape';
import {getRequiredValidator} from '../validationHelpers/formFieldHelpers'

const phoneParser = (value) => {
    return value.replace(/[^\d]/g, '');
};

class PhoneField extends React.Component {
    render() {
        const {required, requiredDisable, validate = [], ...props} =this.props;
        const validators = [...getRequiredValidator({required, requiredDisable}), ...validate];

        return ( <Field type="tel" maxLength="10"
                        component={InputRender} //todo добавить валидатор для правильного формата телефона
                        normalize={normalizePhone}
                        validate={validators}
                        parse={phoneParser} {...props}
        />)
    }
}

PhoneField.propTypes = inputFieldShape;

export default PhoneField