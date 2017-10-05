import React from 'react';
import { Link } from 'react-router-dom';

// @observer
export default (props) => {
  const { email, password, inProgress, handleSubmitForm, handleEmailChange, handlePasswordChange } = props;
  return (
    <form onSubmit={ handleSubmitForm }>
      <div className='login_content'>
        <div className='login_auth_block'>
          <div class='form_group'>
            <label>
              Email:
              <input value={ email } onChange={ handleEmailChange } />
            </label>
            <label>
              Password:
              <input value={ password } onChange={ handlePasswordChange } />
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
              Sign in
            </button>
          </div>
          {/* Блок ошибок*/}
          {/* <div className="form_error">{getError(errors)}</div>*/}

          {/* <div className="form_buttons">*/}
          {/* {!inProgress && <button className="button" type="submit">Войти</button>}*/}
          {/* {inProgress && <button className="button loading_block" type="button"></button>}*/}
          {/* </div>*/}
        </div>
      </div>
      <div className='login_links'>
        <Link to='/forgot'>Забыли пароль?</Link>
        <Link to='/registration'>Зарегистрироваться</Link>
      </div>
    </form>
  );
};

// SignInForm.propTypes = {
// 	loading: PropTypes.bool.isRequired,
// 	onLogin: PropTypes.func.isRequired,
// 	redirectUrl: PropTypes.string,
// 	errors: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
// };

