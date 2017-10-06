import React from 'react';
import { observer } from 'mobx-react';

export default observer((props) => {
  const { logout, user, handleEmailChange } = props;
  return (
    <div >
      <ul>
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
      </ul>
      <div>
        <label>
          Email:
          <input value={ user.email } onChange={ handleEmailChange } />
        </label>
      </div>
      <div>
        <button
          className='btn btn-lg btn-primary pull-xs-right'
          onClick={ logout }
          type='submit'>
          Logout
        </button>
      </div>
    </div>
  );
});

