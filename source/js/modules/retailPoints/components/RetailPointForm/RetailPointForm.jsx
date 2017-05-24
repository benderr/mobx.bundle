/**
 * Created by RobertSabiryanov on 23.05.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form/immutable';
import InputRender from 'common/formElements/InputRender'
import PhoneField from 'common/formElements/fields/PhoneField'

import {isCorrectInn, isCorrectKpp} from 'common/validators/validators'
import normalizeKpp from 'common/formElements/fields/normalizeKpp'
import normalizeInn from 'common/formElements/fields/normalizeInn'


import {isEmpty} from 'common/validators/validators'

const isRequired = (text) => (val) => isEmpty(val) ? text : undefined;
const validateInn = (text) => (val) => !isCorrectInn(val) ? text : undefined;
const validateKpp = (text) => (val) => !isCorrectKpp(val) ? text : undefined;

let disableKpp = true;
const validate = values => {
    //const errors = {};
    return null;
};

const parseInn = value => {
    disableKpp = value.length == 12;
}

class RetailPointForm extends React.Component {

    handleDemoChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
    }

    render() {
        const {handleSubmit, pristine, submitting, onSave, onCancel} = this.props;

        const submit = (props) => {
            let retailPoint = {
                name: props.get('name'),
                address: props.get('address'),
                phone: props.get('phone'),
                inn: props.get('inn'),
                kpp: props.get('kpp'),
                mock: {
                    enabled: this.refs.demoProducts.checked
                }
            };
            onSave(retailPoint);
        };


        return (<form onSubmit={handleSubmit(submit)} style={{position: 'static'}}>
            <div class="page_content  with_bottom_panel  content_padding">
                <div class="form_group form_horizontal">
                    <div class="property_label col three">Название</div>
                    <div class="property_value col nine">
                        <Field name="name" type="text" maxLength="255"
                               class="w100"
                               component={InputRender}
                               validate={[isRequired('Укажите название торговой точки')]}/>
                    </div>
                </div>
                <div class="form_group form_horizontal">
                    <div class="property_label col three">Адрес</div>
                    <div class="property_value col nine">
                        <Field name="address" type="text" maxLength="255"
                               class="w100"
                               component={InputRender}
                               validate={[isRequired('Укажите адрес торговой точки')]}/>
                    </div>
                </div>

                <div class="form_group form_horizontal">
                    <div class="property_label col three">Телефон</div>
                    <div class="property_value col w35">
                        <div class="input_group">
                            <div class="input_group_addon f_normal">+7</div>
                            <PhoneField name="phone" class="w100"
                                        validate={[isRequired('Укажите номер мобильного телефона')]}/>
                        </div>
                    </div>
                </div>

                <div class="form_group form_horizontal">
                    <div class="property_label col three">ИНН</div>
                    <div class="property_value col w35">
                        <Field name="inn" type="text" maxLength="12"
                               class="w100"
                               component={InputRender}
                               validate={[isRequired('Укажите ИНН'), validateInn('Не совпадают контрольные цифры ИНН')]}
                               normalize={normalizeInn}
                               parse={parseInn}/>
                    </div>
                </div>

                <div class="form_group form_horizontal">
                    <div class="property_label col three">КПП</div>
                    <div class="property_value col w35">
                        <Field name="kpp" type="text" maxlength="9"
                               class="w100"
                               component={InputRender}
                               validate={[isRequired('Укажите КПП'), validateKpp('КПП должен содержать 9 цифр')]}
                               normalize={normalizeKpp} disabled={disableKpp}/>
                    </div>
                </div>
                <div class="form_group form_horizontal mt24">
                    <input type="checkbox" name="demoProducts" id="21" ref="demoProducts"/>
                    <label for="21" class="label_check"><i class="icon"></i><span class="f_small">Заполнить демо-товарами</span></label>
                </div>
            </div>
            <div class="page_bottom_panel">
                <button disabled={pristine || submitting} className="button middle wide" type="submit">Сохранить
                </button>
                <a class="button middle wide clean" onClick={onCancel}>Отмена</a>
            </div>
        </form>)
    }
}
RetailPointForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default reduxForm({
    form: 'retailPointForm',
    validate
})(RetailPointForm);