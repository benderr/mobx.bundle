import React from 'react';
import { observer, inject } from 'mobx-react';
import ProfileComponent from '../components/Profile/ProfileComponent';

@inject('profileStore')
@observer
class ProfileContainer extends React.Component {

  render() {
    return (
      <div>
        <ProfileComponent />
      </div>
    );
  }
}

export default ProfileContainer;
