import React from 'react';
import { observer } from 'mobx-react';
import { Button, LoaderPanel } from 'modul-components';
import { InputField, SelectField } from 'common/form/fields';

export default observer((props) => {
  const { form, buttonName } = props;
  return (
    <LoaderPanel>
      <form onSubmit={ form.onSubmit }>
        <div class='login_auth_block '>
          <div class='form_group'>
            <div class='input_group light w100'>
              <InputField field={ form.$('email') }  />
              <div class='input_group_addon icon-mail' />
              <div class='input_light_border_bottom' />
            </div>
          </div>

          <div class='form_group'>
            <div class='input_group light w100'>
              <InputField field={ form.$('password') } type='password'  />
              <div class='input_group_addon icon-password' />
              <div class='input_light_border_bottom' />
            </div>
          </div>

          <SelectField field={ form.$('role') } type='password' />

          <div class='form_buttons'>
            <Button
              className='button'
              type='submit'>
              { buttonName }
            </Button>
          </div>
        </div>

      </form>
    </LoaderPanel>

  );
});
