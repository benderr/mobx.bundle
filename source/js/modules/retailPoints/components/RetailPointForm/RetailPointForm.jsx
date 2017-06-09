/**
 * Created by RobertSabiryanov on 23.05.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Field, formValueSelector, change} from 'redux-form/immutable';
import {InputRender, reduxForm} from 'common/formElements'
import {PhoneField, normalizeKpp,normalizeInn} from 'common/formElements/fields'
import {isCorrectInn, isCorrectKpp, isEmpty, isRequired} from 'common/validators'


const isRequiredKpp = (text) => (val, isIP) => (!isIP && isEmpty(val)) ? text : undefined;
const validateInn = (text) => (val) => !isCorrectInn(val) ? text : undefined;
const validateKpp = (text) => (val) => !isCorrectKpp(val) ? text : undefined;

const validate = values => {
    //const errors = {};
    return null;
};

class RetailPointForm extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.isIP) {
            this.props.dispatch(change('retailPointForm', 'kpp', null));
        }
    }

    render() {
        const {handleSubmit, pristine, submitting, onSave, onCancel, isIP, points} = this.props;

        return (<form onSubmit={handleSubmit(onSave)} style={{position: 'static'}}>
            {points && points.length > 0 && <div class="form_group form_horizontal">
                <div class="mb16">
                    <Field name="newListRadio" id="newListRadio" component="input" type="radio" checked="true"/>
                    <label for="newListRadio" class="label_check">
                        <i class="icon"></i>
                        <span>Новый список товаров</span>
                    </label>
                </div>

                <div class="selected_item  mb16">
                    <input type="radio" name="c2" id="12" checked=""/>
                    <label for="12" class="label_check"><i class="icon"></i><span>Использовать товары и данные другой точки</span></label>

                    <div class="inner_select  mt8">
                        <div class="form_group form_horizontal  mb8">
                            <div class="jsRadSelect2  w100" data-placeholder="Селект" name="adfasd" id="adsf">
                                <option class="jsRadSelect2Options" value="1" selected="">Дмитриевская точка
                                </option>
                                <option class="jsRadSelect2Options" value="2">Вторая точка</option>
                                <option class="jsRadSelect2Options" value="3">Третья точка</option>
                                <option class="jsRadSelect2Options" value="4">Четвертая точка</option>
                            </div>
                        </div>
                        <div class="info_text">Все изменения по товарам из выбранной точки будут отражены также в
                            новой точке
                        </div>
                    </div>
                </div>

                <div class="mb20">
                    <input type="radio" name="c2" id="13"/>
                    <label for="13" class="label_check"><i class="icon"></i><span>Скопировать товары</span></label>
                </div>
            </div>}
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
                               normalize={normalizeInn}/>
                    </div>
                </div>

                <div class="form_group form_horizontal">
                    <div class="property_label col three">КПП</div>
                    <div class="property_value col w35">
                        <Field name="kpp" type="text" maxlength="9"
                               class="w100"
                               component={InputRender}
                               validate={[isRequiredKpp('Укажите КПП', isIP), validateKpp('КПП должен содержать 9 цифр')]}
                               normalize={normalizeKpp} disabled={isIP}/>
                    </div>
                </div>
                <div class="form_group form_horizontal mt24">
                    <Field name="demoProducts" id="demoProducts" component="input" type="checkbox"/>
                    <label for="demoProducts" class="label_check"><i class="icon"></i><span class="f_small">Заполнить демо-товарами</span></label>
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
    loading: PropTypes.bool,
    //points: PropTypes.arrayOf(RetailPointShape)
};

RetailPointForm = reduxForm({
    form: 'retailPointForm',
    validate
})(RetailPointForm);

const selector = formValueSelector('retailPointForm');
RetailPointForm = connect(
    (state, props) => {
        const inn = selector(state, 'inn');
        const isIP = inn && inn.length === 12;
        return {
            isIP
        }
    }
)(RetailPointForm);

export default RetailPointForm