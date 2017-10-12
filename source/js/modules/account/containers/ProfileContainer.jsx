import React from 'react';
import { observer, inject } from 'mobx-react';
import PropTypes from 'prop-types';
import Profile from '../components/Profile';

@inject('profileStore')
@observer
class ProfileContainer extends React.Component {

  static propTypes = {
    profileStore: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.profileStore.getProfile();
  }

  logout(e) {
    const { profileStore, history } = this.props;
    e.preventDefault();
    profileStore.logout()
      .then(() => history.replace('/signin'));
  }

  render() {
    return (
      <Profile
        profileStore={ this.props.profileStore }
        logout={ ::this.logout } />
    );
  }
}

export default ProfileContainer;
