import React from 'react';
import { observer, inject } from 'mobx-react';
import Profile from '../components/Profile';

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
    const { user, inProgress } = this.props.authStore;
    console.log('ProfileContainer render!');
    // Если компонент тупой и не observer
    // const ObserverProfile = observer(Profile)
    return (
      <div>
        <Profile
          inProgress={ inProgress }
          user={ user }
          handleEmailChange={ this.handleEmailChange }
          logout={ this.logout } />
      </div>
    );
  }
}

export default ProfileContainer;
