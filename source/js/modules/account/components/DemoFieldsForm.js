import React from 'react';
import { observer } from 'mobx-react';
import { Button, LoaderPanel, PhoneInput } from 'modul-components';
import { InputField, PhoneField, SelectField, NumberField, AmountField, DatePickerField } from 'common/form/fields';

export default observer((props) => {
  const { form, buttonName } = props;
  return (
    <LoaderPanel>
      <form onSubmit={ form.onSubmit }>
        <InputField field={ form.$('InputField') } />
        <PhoneField field={ form.$('PhoneField') } />
        <SelectField field={ form.$('SelectField') } />
        <NumberField field={ form.$('NumberField') } />
        <AmountField field={ form.$('AmountField') } />
        <DatePickerField field={ form.$('DatePickerField') } />
        <PhoneInput />
        <Button
          className='button'
          type='submit'>
          { buttonName }
        </Button>
      </form>
    </LoaderPanel>
  );
});
