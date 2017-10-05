import React from 'react';

export default (props) => {
  const { logout, user } = props;
  return (
    <div >
      <ul>
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
      </ul>
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

