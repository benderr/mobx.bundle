import React from 'react';
import {observer} from 'mobx-react';
// import {} from 'modul-components';
import {InputField} from 'common/form/fields';

export default observer((props) => {
  const {form} = props;

  return (
    <div>
      <h1>Добавление клиента</h1>
      <form onSubmit={ form.onSubmit } style={ {maxWidth: '500px'} }>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={ form.$('name') } />
            <span class='input_title'>{form.$('name').placeholder}</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={ form.$('abbreviation') } />
            <span class='input_title'>{form.$('abbreviation').placeholder}</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={ form.$('registrationDate') } />
            <span class='input_title'>{form.$('registrationDate').placeholder}</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={ form.$('connectDate') } />
            <span class='input_title'>{form.$('connectDate').placeholder}</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={ form.$('accountingStartDate') } />
            <span class='input_title'>{form.$('accountingStartDate').placeholder}</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={ form.$('opf') } />
            <span class='input_title'>{form.$('opf').placeholder}</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField field={ form.$('connectStatus') } />
            <span class='input_title'>{form.$('connectStatus').placeholder}</span>
          </div>
        </div>
        <div className='form_group'>
          <div className='input_group_title'>
            <InputField type='checkbox' field={ form.$('is1cBase') } />
            <span class='input_title'>{form.$('is1cBase').placeholder}</span>
          </div>
        </div>
        <div className='form_group'>
          <div>
            <input type='checkbox' field={ form.$('is1cBaseCreated') } />
            <span class='input_title'>{form.$('is1cBaseCreated').placeholder}</span>
          </div>
        </div>
        <div className='form_group'>
          <div>
            <input type='checkbox' field={ form.$('is1cConnectStatus') } />
            <span class='input_title'>{form.$('is1cConnectStatus').placeholder}</span>
          </div>
        </div>
        <button class='button second' type='submit'>Добавить клиента</button>
      </form>
    </div>
  );
});
