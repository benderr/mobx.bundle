import React from 'react';
import Profile from '../components/Profile';
import { observer, inject } from 'mobx-react';

@inject('authStore')
@observer
class ProfileContainer extends React.Component {

  logout = (e) => {
    const { authStore, history } = this.props;
    e.preventDefault();
    authStore.logout()
      .then(() => history.replace('/signin'));
  };

  render() {
    const { user } = this.props.authStore;

    return (
      <div>
        <Profile
          user={ user }
          logout={ this.logout } />
      </div>
    );
  }
}

export default ProfileContainer;
