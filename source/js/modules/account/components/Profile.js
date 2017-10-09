import React from 'react';
import { observer } from 'mobx-react';
import { Button } from 'modul-components';

export default observer((props) => {
  const { profileStore: { inProgress }, logout } = props;
  return (
    <div >
      <Button
        className='button second'
        type='submit'
        onClick={ logout }
        disabled={ inProgress }
        loading={ inProgress }>
              Logout
      </Button>
    </div>
  );
});

