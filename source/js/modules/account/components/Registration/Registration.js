import React from 'react';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import RegistrationView from './RegistrationView';
import RegistrationController from './RegistrationController';

@inject('authStore')
@withRouter
@observer
export default class Registration extends React.Component {

  static propTypes = {
    authStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  @observable
  form;

  constructor(props) {
    super(props);
    const { login, errorReset } = this.props;
    this.form = new RegistrationController({ store: { login, errorReset } });
  }

  render() {
    return (
      <RegistrationView
        form={ this.form }
        buttonName={ 'Зарегестрироваться' } />
    );
  }
}
