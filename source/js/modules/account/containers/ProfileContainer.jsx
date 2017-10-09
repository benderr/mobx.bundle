import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Profile from '../components/Profile';

@inject('authStore')
@observer
class ProfileContainer extends React.Component {

  static propTypes = {
    authStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  handleEmailChange(e) {
    this.props.authStore.setEmail(e.target.value);
  }

  logout(e) {
    const { authStore, history } = this.props;
    e.preventDefault();
    this.props.authStore.logout()
      .then(() => history.replace('/signin'));
  }

  render() {
    console.log('ProfileContainer render!');
    return (
      <Profile
        authStore={ this.props.authStore }
        handleEmailChange={ ::this.handleEmailChange }
        logout={ ::this.logout } />
    );
  }
}

export default ProfileContainer;
