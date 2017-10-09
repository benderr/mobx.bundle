import React from 'react';
import { observer } from 'mobx-react';
import { Button, LoaderPanel } from 'modul-components';
import { InputFocusable } from '../../../common/form/validationHelpers';

export default observer((props) => {
  const { authStore: { user, inProgress, authError }, buttonName, handleSubmitForm, handleEmailChange, handlePasswordChange } = props;
  return (
    <LoaderPanel loading={ inProgress }>
      <form onSubmit={ handleSubmitForm }>
        <div className='login_content'>

          <label>
            Email:
              <input className='input' value={ user.email } onChange={ handleEmailChange } />
          </label>
          <label>
            Пароль:
              <input value={ user.password } onChange={ handlePasswordChange } />
          </label>
          <Button
            className='button second'
            type='submit'
            disabled={ inProgress }>
            {buttonName}
          </Button>

          <h3 style={ { color: 'red' } } >
            {authError}
          </h3>
        </div>
      </form>
    </LoaderPanel>

  );
});
