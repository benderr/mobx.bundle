import React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Button, LoaderPanel } from 'modul-components';
import { InputField } from 'common/form/fields/index';
import PasswordRecoveryController from './PasswordRecoveryController';

@inject(({ authStore }) => ({
  inProgress: authStore.inProgress,
  error: authStore.error,
  forgotPass: authStore.forgotPass,
  passwordRecoveryStatus: authStore.passwordRecoveryStatus,
}))
@withRouter
@observer
class PasswordRecovery extends React.Component {

  static propTypes = {
    inProgress: PropTypes.bool.isRequired,
    error: PropTypes.object,
    forgotPass: PropTypes.func.isRequired,
    passwordRecoveryStatus: PropTypes.string.isRequired,
  };

  @observable
  form;

  constructor(props) {
    super(props);
    const { forgotPass } = this.props;
    this.form = new PasswordRecoveryController({ store: { forgotPass } });
  }

  render() {
    const { inProgress, error } = this.props;
    let msg;
    if (error) {
      if (error.data && error.data.message) {
        errorMsg = 'На ваш e-mail отправлено письмо для смены пароля. Пожалуйста, перейдите по ссылке в письме. Ссылка действительна 24 часа.';
      } else {
        errorMsg = 'Неизвестная ошибка';
      }
    }
    return (
      <LoaderPanel >
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
            <div>
              {errorMsg}
            </div>
          </div>
        </form>
      </LoaderPanel>
    );
  }
}

export default PasswordRecovery;
