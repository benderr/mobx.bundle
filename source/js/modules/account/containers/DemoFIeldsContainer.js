import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import DemoFieldsForm from '../components/DemoFieldsForm';
import BaseForm from 'common/form/BaseForm';
import { validateHelper } from 'modul-helpers';

function isEmail({ field }) {
  const isValid = validateHelper.validEmail(field.value);
  return [isValid, 'Email not valid!'];
}

function isRequired({ field }) {
  const isValid = !validateHelper.isEmpty(field.value);
  return [isValid, 'Is required'];
}

const fields = [
  {
    name: 'InputField',
    label: 'InputField',
    placeholder: 'InputField',
    validators: [isEmail, isRequired],
  },
  {
    name: 'PhoneField',
    label: 'PhoneField',
    placeholder: 'PhoneField',
    validators: [isRequired],
  },
  {
    name: 'SelectField',
    label: 'SelectField',
    placeholder: 'SelectField',
    validators: [isRequired],
    extra: [{ value: '0', label: 'по умолчанию (из настроек)', short: 'из настроек' },
      { value: 1104, label: 'НДС 0%', short: '0%' },
      { value: 1103, label: 'НДС 10%', short: '10%' },
      { value: 1102, label: 'НДС 18%', short: '18%' },
      { value: 1105, label: 'НДС не облагается', short: 'не облагается' },
      { value: 1107, label: 'НДС с рассч. ставкой 10%', short: 'с рассч. ставкой 10%' },
      { value: 1106, label: 'НДС с рассч. ставкой 18%', short: 'с рассч. ставкой 18%' }],
  },
  {
    name: 'NumberField',
    label: 'NumberField',
    placeholder: 'NumberField',
    validators: [isRequired],
  },
  {
    name: 'AmountField',
    label: 'AmountField',
    placeholder: 'AmountField',
    validators: [isRequired],
  },
  {
    name: 'DatePickerField',
    label: 'DatePickerField',
    placeholder: 'DatePickerField',
    validators: [isRequired],
  },
];

@observer
class IndexContainer extends React.Component {

  @observable form = new BaseForm({ fields }, {
    hooks: {
      onSuccess(form) {
        console.log('ВСЁ НОРМ');
      },
      onError(form) {
        console.log('ЧТО-ТО НЕ ТАК');
      },
    },
  });

  render() {
    return (
      <div>
        <DemoFieldsForm
          form={ this.form }
          buttonName={ 'check' } />
      </div>
    );
  }
}

export default IndexContainer;
