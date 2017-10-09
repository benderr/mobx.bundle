import React from 'react';
import { observer } from 'mobx-react';

export default observer((props) => {
  const { authStore: { user }, handleEmailChange, logout } = props;
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
          className=''
          onClick={ logout }
          type='submit'>
          Logout
        </button>
      </div>
    </div>
  );
});

