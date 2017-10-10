import React from 'react';
import { observer } from 'mobx-react';
import { Button, LoaderPanel } from 'modul-components';
import InputField from 'common/form/fields/InputField';

export default observer((props) => {
  const { inProgress, form, buttonName } = props;
  return (
    <LoaderPanel >
      <form onSubmit={ form.onSubmit }>
        <div className='login_content'>
          <InputField field={ form.$('email') } />
          <InputField field={ form.$('password') } type='password' />
          <Button
            loading={ inProgress }
            className='button second'
            type='submit'
            disabled={ inProgress }>
            { buttonName }
          </Button>
        </div>
      </form>
    </LoaderPanel>

  );
});
