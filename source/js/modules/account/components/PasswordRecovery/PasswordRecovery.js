import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Button, LoaderPanel } from 'modul-components';
import { InputField } from 'common/form/fields/index';
import PasswordRecoveryController from './PasswordRecoveryController';

@inject(({ passwordRecoveryStore }) => ({
  inProgress: passwordRecoveryStore.inProgress,
  error: passwordRecoveryStore.error,
  status: passwordRecoveryStore.status,
  forgotPass: passwordRecoveryStore.forgotPass,
}))
@withRouter
@observer
class PasswordRecovery extends React.Component {

  static propTypes = {
    inProgress: PropTypes.bool.isRequired,
    error: PropTypes.object,
    status: PropTypes.string.isRequired,
    forgotPass: PropTypes.func.isRequired,
  };

  @observable
  form;

  constructor(props) {
    super(props);
    const { forgotPass } = this.props;
    this.form = new PasswordRecoveryController({ store: { forgotPass } });
  }

  render() {
    const { inProgress, error, status } = this.props;
    let isSuccess = status === 'success';
    let msg = '';
    if (isSuccess) {
      msg = 'На ваш e-mail отправлено письмо для смены пароля. Пожалуйста, перейдите по ссылке в письме. Ссылка действительна 24 часа.';
    } else if (status === 'error') {
      const exceptionType = error && error.data && error.data.exceptionType;
      switch (exceptionType) {
      case 'UserNotFound':
        msg = 'Неверный адрес электронный почты';
        isSuccess = false;
        break;
      case 'AlreadySent':
        msg = 'На ваш e-mail отправлено письмо для смены пароля. Пожалуйста, перейдите по ссылке в письме. Ссылка действительна 24 часа.';
        isSuccess = true;
        break;
      default:
        msg = 'Неизвестная ошибка';
      }
    }

    return (
      <LoaderPanel >
        {isSuccess ?
          <div>
            {msg}
          </div> :
          <form onSubmit={ this.form.onSubmit }>
            <div class='login_auth_block '>
              <div class='form_group'>
                <div class='input_group light w100'>
                  <InputField field={ this.form.$('email') } hideTips={ true } />
                  <div class='input_group_addon icon-mail' />
                  <div class='input_light_border_bottom' />
                </div>
              </div>

              <div class='form_buttons'>
                <Button
                  loading={ inProgress } className='button'
                  type='submit'
                  disabled={ inProgress }>Далее</Button>
              </div>
              <div className={'error'}>
                {msg}
              </div>
            </div>
          </form>
        }

      </LoaderPanel>
    );
  }
}

export default PasswordRecovery;
