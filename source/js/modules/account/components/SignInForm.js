import React from 'react';
import { observer } from 'mobx-react';


export default observer((props) => {
  const { user, inProgress, buttonName, handleSubmitForm, handleEmailChange, handlePasswordChange, authError } = props;
  return (
    <form onSubmit={ handleSubmitForm }>
      <div className='login_content'>
        <div className='login_auth_block'>
          <div class='form_group'>
            <label>
              Email:
              <input value={ user.email } onChange={ handleEmailChange } />
            </label>
            <label>
              Пароль:
              <input value={ user.password } onChange={ handlePasswordChange } />
            </label>
            <div>
              <label>
                InProgress: {`${ inProgress }`}
              </label>
            </div>
            <div />
          </div>
          <div>
            <button
              className='btn btn-lg btn-primary pull-xs-right'
              type='submit'
              disabled={ inProgress }>
              {buttonName}
            </button>
          </div>

          <h3 style={ { color: 'red' } } >
            {authError}
          </h3>
        </div>
      </div>
    </form>
  );
});

// SignInForm.propTypes = {
// 	loading: PropTypes.bool.isRequired,
// 	onLogin: PropTypes.func.isRequired,
// 	redirectUrl: PropTypes.string,
// 	errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
// };

