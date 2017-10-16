import React from 'react';
import { observer } from 'mobx-react';
import { Button, LoaderPanel } from 'modul-components';
import { InputField, PhoneField, SelectField, NumberField, AmountField, DatePickerField } from 'common/form/fields';
import { DatePicker } from 'modul-components';

export default observer((props) => {
  const { form, buttonName, options, changePhone,
    searchOptions, searchLoading } = props;
  const onChange = () => {
    console.log();
  };

  return (
    <LoaderPanel >
      <form onSubmit={ form.onSubmit } style={ { maxWidth: '300px' } }>
        <InputField field={ form.$('email') } />
        <PhoneField field={ form.$('phone') } onChange={ onChange } />
        <SelectField
          field={ form.$('select') }
          options={ options }
          searchable={ true }
          isLoading={ searchLoading }
          onInputChange={ searchOptions } />
        <NumberField field={ form.$('NumberField') } />
        <AmountField field={ form.$('AmountField') } />
        <DatePickerField field={ form.$('date') } />
        <DatePicker />
        <button type='button' className='button' onClick={ changePhone }>Change</button>
        <Button
          className='button'
          type='submit'>
          { buttonName }
        </Button>
      </form>
    </LoaderPanel>
  );
});
