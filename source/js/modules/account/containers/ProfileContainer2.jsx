import React from 'react';
import { observer, inject } from 'mobx-react';
import Profile from '../components/Profile2';

@inject('authStore')
@observer
class ProfileContainer extends React.Component {

  handleEmailChange = e => {
    this.props.authStore.setEmail(e.target.value);
  };

  logout = (e) => {
    const { authStore, history } = this.props;
    e.preventDefault();
    authStore.logout()
      .then(() => history.replace('/signin'));
  };

  render() {
    const { user: { name, email } } = this.props.authStore;
    console.log('ProfileContainer render!');
    return (
      <div>
        <Profile
          name={ name }
          email={ email }
          handleEmailChange={ this.handleEmailChange }
          logout={ this.logout } />
      </div>
    );
  }
}

export default ProfileContainer;
