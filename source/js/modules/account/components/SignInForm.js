import React from 'react';
import {observer} from 'mobx-react';
import {Button, LoaderPanel} from 'modul-components';
import {InputField, PhoneField} from 'common/form/fields';

export default observer((props) => {
  const {inProgress, form, buttonName} = props;
  return (
    <LoaderPanel >
      <form onSubmit={ form.onSubmit }>
        <div class="login_auth_block ">
          <div class="form_group">
            <div class="input_group light w100">
              <InputField field={ form.$('email') } hideTips={true}/>
              <div class="input_group_addon icon-mail"></div>
              <div class="input_light_border_bottom"></div>
            </div>
          </div>

          <div class="form_group">
            <div class="input_group light w100">
              {/*<input type="text" value=""/>*/}
              <InputField field={ form.$('password') } type='password' hideTips={true}/>
              <div class="input_group_addon icon-password"></div>
              <div class="input_light_border_bottom"></div>
            </div>
          </div>

          {/*<PhoneField field={ form.$('phone') }/>*/}
          {/*<InputField field={ form.$('password') } type='password'/>*/}
          <div class="form_buttons">
            <Button loading={ inProgress } className='button'
                    type='submit'
                    disabled={ inProgress }>{ buttonName }</Button>
          </div>
        </div>
      </form>
    </LoaderPanel>

  );
});
