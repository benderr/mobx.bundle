/**
 * Created by RobertSabiryanov on 23.05.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {Field, formValueSelector, change} from 'redux-form/immutable';
import {InputRender, reduxForm} from 'common/formElements';
import {PhoneField, normalizeKpp, normalizeInn} from 'common/formElements/fields';
import {isCorrectInn, isCorrectKpp, isEmpty, isRequired} from 'common/validators';
import RetailPointShape from '../RetailPointShape';
import NextPointSettings from './NextPointSettings';

const isRequiredKpp = (text) => (val, isIP) => (!isIP && isEmpty(val)) ? text : undefined;
const validateInn = (text) => (val) => !isCorrectInn(val) ? text : undefined;
const validateKpp = (text) => (val) => !isCorrectKpp(val) ? text : undefined;

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
        const {onSave, onCancel, onDelete,  points} = this.props;
        const {handleSubmit, submitting,  isIP,  productsSource, showProductSources, showDelete} = this.props;

        return (<form onSubmit={handleSubmit(onSave)} style={{position: 'static'}}>
            <div class="page_content  with_bottom_panel  content_padding">

                {showProductSources &&
                <NextPointSettings points={points} productsSource={productsSource}/>}

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
                {productsSource === 'BLANK' && <div class="form_group form_horizontal mt24">
                    <Field name="demoProducts" id="demoProducts" component="input" type="checkbox"/>
                    <label for="demoProducts" class="label_check"><i class="icon"></i><span class="f_small">Заполнить демо-товарами</span></label>
                </div>}
            </div>
            <div class="page_bottom_panel">
                <button disabled={submitting} className="button middle wide" type="submit">Сохранить
                </button>
                <a class="button middle wide clean" onClick={onCancel}>Отмена</a>
                {showDelete && <a class="button middle wide clean mr44 f_right" onClick={onDelete}>Удалить точку</a>}
            </div>
        </form>)
    }
}
RetailPointForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    points: PropTypes.arrayOf(RetailPointShape),
    retailPoint: RetailPointShape
};

RetailPointForm = reduxForm({
    form: 'retailPointForm'
})(RetailPointForm);

const selector = formValueSelector('retailPointForm');
RetailPointForm = connect(
    (state, props) => {
        const productsSource = selector(state, 'productsSource');
        const inn = selector(state, 'inn');
        const isIP = inn && inn.length === 12;
        const initialValues = props.retailPoint;
        const points = props.points;
        const showProductSources = points && points.length > 0 && (initialValues && initialValues.isNew);
        const showDelete = initialValues && !initialValues.isNew;
        return {
            isIP,
            productsSource,
            showProductSources,
            showDelete,
            initialValues
        }
    }
)(RetailPointForm);

export default RetailPointForm