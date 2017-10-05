import React from 'react';

export default (props) => {
  console.log('Profile2 render!');
  const { name, email, handleEmailChange, logout } = props;
  return (
    <div >
      <ul>
        <li>Name: {name}</li>
        <li>Email: {email}</li>
      </ul>
      <div>
        <label>
          Email:
          <input value={ email } onChange={ handleEmailChange } />
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
};

