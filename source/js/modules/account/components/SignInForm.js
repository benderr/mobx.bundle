import React from 'react';
import { observer } from 'mobx-react';
import { Button, LoaderPanel } from 'modul-components';

export default observer((props) => {
  const { authStore: { user, inProgress, authError }, buttonName, handleSubmitForm, handleEmailChange, handlePasswordChange } = props;
  return (
    <LoaderPanel loading={ inProgress }>
      <form onSubmit={ handleSubmitForm }>
        <div className='login_content'>
          <div>
            Email:
              <input value={ user.email } onChange={ handleEmailChange } />
          </div>
          <div>
            Пароль:
              <input value={ user.password } onChange={ handlePasswordChange } />
          </div>
          <Button
            loading={ inProgress }
            className='button second'
            type='submit'
            disabled={ inProgress }>
            {buttonName}
          </Button>
        </div>
      </form>
    </LoaderPanel>

  );
});
