/**
 * Created by RobertSabiryanov on 23.05.17.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form/immutable';


const isRequired = (text) => (val) => isEmpty(val) ? text : undefined;

const validate = values => {
    //const errors = {};
    return null;
};

class RetailPointForm extends React.Component {

    render() {
        const {onSave, onCancel} = this.props;

        return (<div>
            <div class="page_content  with_bottom_panel  content_padding">
                <div class="form_group form_horizontal">
                    <div class="property_label col three">Название</div>
                    <div class="property_value col nine">
                        <input type="text" class="w100"/>
                    </div>
                </div>
                <div class="form_group form_horizontal">
                    <div class="property_label col three">Адрес</div>
                    <div class="property_value col nine">
                        <input type="text" class="w100"/>
                    </div>
                </div>

                <div class="form_group form_horizontal">
                    <div class="property_label col three">Телефон</div>
                    <div class="property_value col four">
                        <input type="text" class="w100" value="+7"/>
                    </div>
                </div>

                <div class="form_group form_horizontal">
                    <div class="property_label col three">ИНН</div>
                    <div class="property_value col four">
                        <input type="text" class="w100"/>
                    </div>
                </div>

                <div class="form_group form_horizontal">
                    <div class="property_label col three">КПП</div>
                    <div class="property_value col four">
                        <input type="text" class="w100"/>
                    </div>
                </div>

                <div class="form_group form_horizontal">
                    <div class="property_label col three">Вид кассы</div>
                    <div class="property_value col nine">
                        <div class="jsRadSelect2  w100" data-placeholder="Селект" name="adfasd" id="adsf">
                            <option class="jsRadSelect2Options" value="1">Азат</option>
                            <option class="jsRadSelect2Options" value="2">Алия Арсланова</option>
                            <option class="jsRadSelect2Options" value="3">Андрей Вариков</option>
                            <option class="jsRadSelect2Options" value="4">Дамир Амиров</option>
                            <option class="jsRadSelect2Options" value="5">Денис Маслов</option>
                            <option class="jsRadSelect2Options" value="6">Динар Галимов Радикович Динар Галимов
                                Радикович
                            </option>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page_bottom_panel">
                <a class="button middle wide" onClick={onSave}>Сохранить</a>
                <a class="button middle wide clean" onClick={onCancel}>Отмена</a>
            </div>
        </div>)
    }
}
RetailPointForm.propTypes = {
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default  reduxForm({
    form: 'retailPointForm',// имя формы в state (state.form.auth)
    validate
    //asyncValidate
})(RetailPointForm);